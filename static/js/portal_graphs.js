//Sample
	var table = dc.dataTable("#sample_table");
	var table2 = dc.dataTable("#sample_table2");
	var table3 = dc.dataTable("#sample_table3");

	var records = [{"Port Category (Regional)":"SOUTHERN LUZON","Port Management Office":"PMO Batangas","Port Name":"BATANGAS","Total Port Calls (2017)":44113,"Total Port Calls (2016)":44416,"Total Cargo Throughput (2017)":22612133,"Total Cargo Throughput (2016)":24931942,"Total Container Traffic (2017)":188077,"Total Container Traffic (2016)":135164},
	{"Port Category (Regional)":"SOUTHERN LUZON","Port Management Office":"PMO Bicol","Port Name":"LEGASPI","Total Port Calls (2017)":18390,"Total Port Calls (2016)":22366,"Total Cargo Throughput (2017)":1901353,"Total Cargo Throughput (2016)":2172722,"Total Container Traffic (2017)":0,"Total Container Traffic (2016)":16},
	{"Port Category (Regional)":"MNL\\/NORTHERN LUZON","Port Management Office":"NCR NORTH","Port Name":"PIER 2 - BATANGAS","Total Port Calls (2017)":6067,"Total Port Calls (2016)":5209,"Total Cargo Throughput (2017)":28301824,"Total Cargo Throughput (2016)":22304714,"Total Container Traffic (2017)":1137455,"Total Container Traffic (2016)":1043705},
	{"Port Category (Regional)":"MNL\\/NORTHERN LUZON","Port Management Office":"NCR SOUTH","Port Name":"PIER 3 - NCR SOUTH","Total Port Calls (2017)":3855,"Total Port Calls (2016)":3883,"Total Cargo Throughput (2017)":7472825,"Total Cargo Throughput (2016)":7297102,"Total Container Traffic (2017)":877593,"Total Container Traffic (2016)":889464},
	{"Port Category (Regional)":"VISAYAS","Port Management Office":"PMO Bohol","Port Name":"OTAGBILARAN","Total Port Calls (2017)":24251,"Total Port Calls (2016)":24841,"Total Cargo Throughput (2017)":4225331,"Total Cargo Throughput (2016)":3929391,"Total Container Traffic (2017)":26777,"Total Container Traffic (2016)":24619},
	{"Port Category (Regional)":"VISAYAS","Port Management Office":"PMO Panay\\/Guimaras","Port Name":"FORT SAN PEDRO","Total Port Calls (2017)":27130,"Total Port Calls (2016)":24834,"Total Cargo Throughput (2017)":8508897,"Total Cargo Throughput (2016)":9820302,"Total Container Traffic (2017)":148438,"Total Container Traffic (2016)":133538},
	{"Port Category (Regional)":"SOUTHERN MINDANAO","Port Management Office":"PMO Cotabato","Port Name":"COTABATO","Total Port Calls (2017)":157,"Total Port Calls (2016)":125,"Total Cargo Throughput (2017)":98912,"Total Cargo Throughput (2016)":87199,"Total Container Traffic (2017)":0,"Total Container Traffic (2016)":0},
	{"Port Category (Regional)":"SOUTHERN MINDANAO","Port Management Office":"PMO Davao","Port Name":"SASA WHARF","Total Port Calls (2017)":32063,"Total Port Calls (2016)":32372,"Total Cargo Throughput (2017)":12999706,"Total Cargo Throughput (2016)":11602108,"Total Container Traffic (2017)":594497,"Total Container Traffic (2016)":651448},
	{"Port Category (Regional)":"NORTHERN MINDANAO","Port Management Office":"PMO Agusan","Port Name":"NASIPIT","Total Port Calls (2017)":1281,"Total Port Calls (2016)":1021,"Total Cargo Throughput (2017)":6188521,"Total Cargo Throughput (2016)":4742824,"Total Container Traffic (2017)":34442,"Total Container Traffic (2016)":32150},
	{"Port Category (Regional)":"NORTHERN MINDANAO","Port Management Office":"PMO Surigao","Port Name":"SURIGAO","Total Port Calls (2017)":10401,"Total Port Calls (2016)":9698,"Total Cargo Throughput (2017)":30533369,"Total Cargo Throughput (2016)":35435136,"Total Container Traffic (2017)":6943,"Total Container Traffic (2016)":5428}];
					
//Dimensions
    var ndx = crossfilter(records),
		portDim = ndx.dimension(function(d){return d["Port Name"];}),
		portcallsPyDim = ndx.dimension(function(d){return +d["Total Port Calls (2016)"];}),
		portcallsCyDim = ndx.dimension(function(d){return +d["Total Port Calls (2017)"];}),
		cargothroughputPyDim = ndx.dimension(function(d){return +d["Total Cargo Throughput (2016)"];}),
		cargothroughputCyDim = ndx.dimension(function(d){return +d["Total Cargo Throughput (2017)"];}),
		containerPyDim = ndx.dimension(function(d){return +d["Total Container Traffic (2016)"];}),
		containerCyDim = ndx.dimension(function(d){return +d["Total Container Traffic (2017)"];}),
		rank = function (p) { return "" };		

//PORT CALLS
//Table
  var colspan = null;
  table
    .width(768)
    .height(480)
    .dimension(portcallsCyDim)
    .group(rank)
    .columns([function (d) { return d["Port Name"] },
				function (d) { return d["Total Port Calls (2016)"].toLocaleString() },
				function (d) { return d["Total Port Calls (2017)"].toLocaleString() }])
    .sortBy(function (d) { return d["Total Port Calls (2017)"]})
    .order(d3.descending)
	.size(5)
    table.render();	
	
//CARGO THROUGHPUT (M.T.)
//Table
  table2
    .width(768)
    .height(480)
    .dimension(cargothroughputCyDim)
    .group(rank)
    .columns([function (d) { return d["Port Name"] },
				function (d) { return d["Total Cargo Throughput (2016)"].toLocaleString() },
				function (d) { return d["Total Cargo Throughput (2017)"].toLocaleString() }])
    .sortBy(function (d) { return d["Total Cargo Throughput (2017)"] })
    .order(d3.descending)
	.size(5)
    table2.render();

//CONTAINER TRAFFIC (in TEU)
//Table
  table3
    .width(768)
    .height(480)
    .dimension(containerCyDim)
    .group(rank)
    .columns([function (d) { return d["Port Name"] },
				function (d) { return d["Total Container Traffic (2016)"].toLocaleString() },
				function (d) { return d["Total Container Traffic (2017)"].toLocaleString() }])
    .sortBy(function (d) { return d["Total Container Traffic (2017)"] })
    .order(d3.descending)
	.size(5)
    table3.render();


// Sort records by (1)Port Calls, (2)Cargo Throughput, (3)Container Traffic, then create array of Port Name, PY, CY
// (1)Port Calls
	var portcalls = records.sort(function (a, b) {
	  return b["Total Port Calls (2017)"] - a["Total Port Calls (2017)"];
	});
	
	portcallsPort = new Array
		portcalls.forEach(function(d){
        portcallsPort.push(d["Port Name"]);
    });

	portcallsPyTotal = new Array
		portcalls.forEach(function(d){
        portcallsPyTotal.push(d["Total Port Calls (2016)"]);
    });

	portcallsCyTotal = new Array
		portcalls.forEach(function(d){
        portcallsCyTotal.push(d["Total Port Calls (2017)"]);
    });

	console.log(JSON.stringify(portcallsPort.slice(0,5)));		
	console.log(JSON.stringify(portcallsCyTotal.slice(0,5)));		
	
// (2)Cargo Throughput
	var cargothroughput = records.sort(function (a, b) {
	  return b["Total Cargo Throughput (2017)"] - a["Total Cargo Throughput (2017)"];
	});

	cargothroughputPort = new Array
		cargothroughput.forEach(function(d){
        cargothroughputPort.push(d["Port Name"]);
    });

	cargothroughputPyTotal = new Array
	cargothroughput.forEach(function(d){
        cargothroughputPyTotal.push(d["Total Cargo Throughput (2016)"]);
    });

	cargothroughputCyTotal = new Array
	cargothroughput.forEach(function(d){
        cargothroughputCyTotal.push(d["Total Cargo Throughput (2017)"]);
    });

// (3)Container Traffic
	var containertraffic = records.sort(function (a, b) {
	  return b["Total Container Traffic (2017)"] - a["Total Container Traffic (2017)"];
	});

	containertrafficPort = new Array
	containertraffic.forEach(function(d){
        containertrafficPort.push(d["Port Name"]);
    });

	containertrafficPyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficPyTotal.push(d["Total Container Traffic (2016)"]);
    });

	containertrafficCyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficCyTotal.push(d["Total Container Traffic (2017)"]);
    });
	
	new Chart(document.getElementById("port-calls"), {
	type: 'horizontalBar',
	data: {
	labels: portcallsPort.slice(0,5),
	datasets: [
	{ label: "2016",
	  backgroundColor: "#6b486b",
	  data: portcallsPyTotal.slice(0,5)},
	{ label: "YTD 2017",
	  backgroundColor: "#ff8c00",
	  data: portcallsCyTotal.slice(0,5)
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
			labels: cargothroughputPort.slice(0,5),
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: cargothroughputPyTotal.slice(0,5)},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: cargothroughputCyTotal.slice(0,5)
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
			labels: containertrafficPort.slice(0,5),
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: containertrafficPyTotal.slice(0,5)},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: containertrafficCyTotal.slice(0,5)
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
