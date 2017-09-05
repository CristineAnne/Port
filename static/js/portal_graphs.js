//Sample
//PORT CALLS
	var table = dc.dataTable("#sample_table");
	var records = [{"PMO":"NCR NORTH","PYTOTAL":5234230,"CYTOTAL":3479054},
					{"PMO":"SOUTHERN MINDANAO","PYTOTAL":2201370,"CYTOTAL":2015832},
					{"PMO":"NCR SOUTH","PYTOTAL":3283987,"CYTOTAL":3097684},
					{"PMO":"NORTHERN MINDANAO","PYTOTAL":2044083,"CYTOTAL":1930013},
					{"PMO":"SOUTHERN LUZON","PYTOTAL":5428742,"CYTOTAL":4387941}];
					
//Dimensions
    var ndx = crossfilter(records),
		portDim = ndx.dimension(function(d){return d.PMO;}),
		pyDim = ndx.dimension(function(d){return +d.PYTOTAL;}),
		cyDim = ndx.dimension(function(d){return +d.CYTOTAL;});
		rank = function (p) { return "" };		

//Table
  var colspan = null;
  table
    .width(768)
    .height(480)
    .dimension(portDim)
    .group(rank)
    .columns([function (d) { return d.PMO },
				function (d) { return d.PYTOTAL.toLocaleString() },
				function (d) { return d.CYTOTAL.toLocaleString() }])
    .sortBy(function (d) { return d.CYTOTAL })
    .order(d3.descending)
    table.render();	
	
	console.log(JSON.stringify(portDim.top(Infinity)));		
	console.log(ndx.size());



	
//CARGO THROUGHPUT (M.T.)
	var table2 = dc.dataTable("#sample_table2");
	var records2 = [{"PMO":"NCR NORTH","PYTOTAL":5234230,"CYTOTAL":3479054},
					{"PMO":"SOUTHERN MINDANAO","PYTOTAL":2201370,"CYTOTAL":2015832},
					{"PMO":"NCR SOUTH","PYTOTAL":3283987,"CYTOTAL":3097684},
					{"PMO":"NORTHERN MINDANAO","PYTOTAL":2044083,"CYTOTAL":1930013},
					{"PMO":"SOUTHERN LUZON","PYTOTAL":5428742,"CYTOTAL":4387941}];
					
					
//Dimensions
    var ndx2 = crossfilter(records2),
		portDim2 = ndx2.dimension(function(d){return d.PMO;}),
		pyDim2 = ndx2.dimension(function(d){return +d.PYTOTAL;}),
		cyDim2 = ndx2.dimension(function(d){return +d.CYTOTAL;});
		rank2 = function (p) { return "" };		

//Table
  table2
    .width(768)
    .height(480)
    .dimension(portDim2)
    .group(rank2)
    .columns([function (d) { return d.PMO },
				function (d) { return d.PYTOTAL.toLocaleString() },
				function (d) { return d.CYTOTAL.toLocaleString() }])
    .sortBy(function (d) { return d.CYTOTAL })
    .order(d3.descending)
    table2.render();
	
	console.log(JSON.stringify(portDim2.top(Infinity)));		
	console.log(ndx2.size());




//CONTAINER TRAFFIC (in TEU)
	var table3 = dc.dataTable("#sample_table3");
	var records3 = [{"PMO":"NCR NORTH","PYTOTAL":5234230,"CYTOTAL":3479054},
					{"PMO":"SOUTHERN MINDANAO","PYTOTAL":2201370,"CYTOTAL":2015832},
					{"PMO":"NCR SOUTH","PYTOTAL":3283987,"CYTOTAL":3097684},
					{"PMO":"NORTHERN MINDANAO","PYTOTAL":2044083,"CYTOTAL":1930013},
					{"PMO":"SOUTHERN LUZON","PYTOTAL":5428742,"CYTOTAL":4387941}];
					
//Dimensions
    var ndx3 = crossfilter(records3),
		portDim3 = ndx3.dimension(function(d){return d.PMO;}),
		pyDim3 = ndx3.dimension(function(d){return +d.PYTOTAL;}),
		cyDim3 = ndx3.dimension(function(d){return +d.CYTOTAL;});
		rank3 = function (p) { return "" };		

//Table
  table3
    .width(768)
    .height(480)
    .dimension(portDim3)
    .group(rank3)
    .columns([function (d) { return d.PMO },
				function (d) { return d.PYTOTAL.toLocaleString() },
				function (d) { return d.CYTOTAL.toLocaleString() }])
    .sortBy(function (d) { return d.CYTOTAL })
    .order(d3.descending)
    table3.render();
	
	console.log(JSON.stringify(portDim3.top(Infinity)));		
	console.log(ndx3.size());




	
//Groups
var portGroup = portDim.group();

//Charts
  var portCallsChart = dc.barChart("#port-calls");
  
  portCallsChart
	.width(250)
	.height(161)
	.dimension(portDim)
	.group(portGroup)
	.elasticY(true)
	.yAxis().ticks(4);
  
	// sort by pytotal
	records.sort(function (a, b) {
	  return b.PYTOTAL - a.PYTOTAL;
	});
	
	port = new Array
		records.forEach(function(d){
        port.push(d["PMO"]);
    });

	pytotal = new Array
	records.forEach(function(d){
        pytotal.push(d["PYTOTAL"]);
    });

	cytotal = new Array
	records.forEach(function(d){
        cytotal.push(d["CYTOTAL"]);
    });

	console.log(JSON.stringify(records));		
	console.log(JSON.stringify(port));		
	console.log(JSON.stringify(cytotal));		

	new Chart(document.getElementById("port-calls"), {
	type: 'horizontalBar',
	data: {
	labels: port,
	datasets: [
	{ label: "2016",
	  backgroundColor: "#6b486b",
	  data: pytotal},
	{ label: "YTD 2017",
	  backgroundColor: "#ff8c00",
	  data: cytotal
	}]},
		options: {
			maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						display: false
					},
					barPercentage: 1,
					categoryPercentage: 0.5
				}],
				xAxes: [{
					gridLines: {
						offsetGridLines: false
					}
				}]
			},
			legend: {
				display: true,
				position: 'right',
				labels: {boxWidth: 9,
						 fontSize: 9,
						 fontFamily: 'sans-serif'}
			}
		}
	});
	
	new Chart(document.getElementById("cargo-throughput"), {
		type: 'horizontalBar',
		data: {
			labels: port.slice(0,3),
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: pytotal.slice(0,3)},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: cytotal.slice(0,3)
			}]},
			options: {
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							display: false
						},
						barPercentage: 1,
						categoryPercentage: 0.5
					}],
					xAxes: [{
						gridLines: {
							offsetGridLines: false
						}
					}]
				},
				legend: {
					display: true,
					position: 'right',
					labels: {boxWidth: 9,
							 fontSize: 9,
							 fontFamily: 'sans-serif'}
				}
			}
		});
	
	new Chart(document.getElementById("container-traffic"), {
		type: 'horizontalBar',
		data: {
			labels: port,
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: pytotal},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: cytotal
			}]},
			options: {
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							display: false
						},
						barPercentage: 1,
						categoryPercentage: 0.5
					}],
					xAxes: [{
						gridLines: {
							offsetGridLines: false
						}
					}]
				},
				legend: {
					display: true,
					position: 'right',
					labels: {boxWidth: 9,
							 fontSize: 9,
							 fontFamily: 'sans-serif'}
				}
			}
		});
		
dc.renderAll();


