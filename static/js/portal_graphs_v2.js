//Sample
d3.json("input/PortStats_v2.json", function(error, json) {
              if (error) return console.warn(error);
	var records = json;
	
	var table = dc.dataTable("#sample_table");
	var table2 = dc.dataTable("#sample_table2");
	var table3 = dc.dataTable("#sample_table3");
					
//Dimensions
    var pCalls = crossfilter(records["Port Calls"]),
		portcallsPyDim = pCalls.dimension(function(d){return +d["2016 TOTAL"];}),
		portcallsCyDim = pCalls.dimension(function(d){return +d["2017 TOTAL"];}),
		cThroughput = crossfilter(records["Cargo Throughput"]),
		cargothroughputPyDim = cThroughput.dimension(function(d){return +d["2016 TOTAL"];}),
		cargothroughputCyDim = cThroughput.dimension(function(d){return +d["2017 TOTAL"];}),
		container = crossfilter(records["Container Traffic"]),
		containerPyDim = container.dimension(function(d){return +d["2016 TOTAL"];}),
		containerCyDim = container.dimension(function(d){return +d["2017 TOTAL"];}),
		rank = function (p) { return "" };		

//PORT CALLS
//Table
  var colspan = null;
  table
    .width(768)
    .height(480)
    .dimension(portcallsCyDim)
    .group(rank)
    .columns([function (d) { return d["Port Dock"] },
				function (d) { return d["2016 TOTAL"].toLocaleString() },
				function (d) { return d["2017 TOTAL"].toLocaleString() }])
    .sortBy(function (d) { return d["2017 TOTAL"]})
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
    .columns([function (d) { return d["Port Dock"] },
				function (d) { return d["2016 TOTAL"].toLocaleString() },
				function (d) { return d["2017 TOTAL"].toLocaleString() }])
    .sortBy(function (d) { return d["2017 TOTAL"]})
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
    .columns([function (d) { return d["Port Dock"] },
				function (d) { return d["2016 TOTAL"].toLocaleString() },
				function (d) { return d["2017 TOTAL"].toLocaleString() }])
    .sortBy(function (d) { return d["2017 TOTAL"]})
    .order(d3.descending)
	.size(5)
    table3.render();


// Sort records by (1)Port Calls, (2)Cargo Throughput, (3)Container Traffic, then create array of Port Name, PY, CY
// (1)Port Calls
	var portcalls = records["Port Calls"].sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});
	
	portcallsPort = new Array
		portcalls.forEach(function(d){
        portcallsPort.push(d["Port Dock"]);
    });

	portcallsPyTotal = new Array
		portcalls.forEach(function(d){
        portcallsPyTotal.push(d["2016 TOTAL"]);
    });

	portcallsCyTotal = new Array
		portcalls.forEach(function(d){
        portcallsCyTotal.push(d["2017 TOTAL"]);
    });

	console.log(JSON.stringify(portcallsPort.slice(0,5)));		
	console.log(JSON.stringify(portcallsCyTotal.slice(0,5)));		
	
// (2)Cargo Throughput
	var cargothroughput = records["Cargo Throughput"].sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});

	cargothroughputPort = new Array
		cargothroughput.forEach(function(d){
        cargothroughputPort.push(d["Port Dock"]);
    });

	cargothroughputPyTotal = new Array
	cargothroughput.forEach(function(d){
        cargothroughputPyTotal.push(d["2016 TOTAL"]);
    });

	cargothroughputCyTotal = new Array
	cargothroughput.forEach(function(d){
        cargothroughputCyTotal.push(d["2017 TOTAL"]);
    });

// (3)Container Traffic
	var containertraffic = records["Container Traffic"].sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});

	containertrafficPort = new Array
	containertraffic.forEach(function(d){
        containertrafficPort.push(d["Port Dock"]);
    });

	containertrafficPyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficPyTotal.push(d["2016 TOTAL"]);
    });

	containertrafficCyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficCyTotal.push(d["2017 TOTAL"]);
    });

//Charts
//PORT CALLS	
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

//CARGO THROUGHPUT	
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

//CONTAINER TRAFFIC		
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

var c = document.getElementById("port-calls");
var ctx = c.getContext("2d");
ctx.font = "8px";

var othersPortCallsPY = portcallsPyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var othersPortCallsCY = portcallsCyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var othersCargothroughputPyTotal = cargothroughputPyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var othersCargothroughputCyTotal = cargothroughputCyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var othersContainertrafficPyTotal = containertrafficPyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var othersContainertrafficCyTotal = containertrafficCyTotal.slice(5,10).reduce((a, b) => a + b, 0);
var totalPortCallsPY = portcallsPyTotal.reduce((a, b) => a + b, 0);
var totalPortCallsCY = portcallsCyTotal.reduce((a, b) => a + b, 0);
var totalCargothroughputPyTotal = cargothroughputPyTotal.reduce((a, b) => a + b, 0);
var totalCargothroughputCyTotal = cargothroughputCyTotal.reduce((a, b) => a + b, 0);
var totalContainertrafficPyTotal = containertrafficPyTotal.reduce((a, b) => a + b, 0);
var totalContainertrafficCyTotal = containertrafficCyTotal.reduce((a, b) => a + b, 0);

console.log(JSON.stringify(portcallsPyTotal.slice(5,10))+ ", " + othersPortCallsPY + ", " + totalPortCallsPY)
var dataTable1 = document.getElementById("sample_table");
var dataTable2= document.getElementById("sample_table2");
var dataTable3= document.getElementById("sample_table3");

tables = ["dataTable1", "dataTable2", "dataTable3"]
totalValues = [totalPortCallsPY, totalPortCallsCY, totalCargothroughputPyTotal, totalCargothroughputCyTotal, totalContainertrafficPyTotal, totalContainertrafficCyTotal]
othersValues = [othersPortCallsPY, othersPortCallsCY, othersCargothroughputPyTotal, othersCargothroughputCyTotal, othersContainertrafficPyTotal, othersContainertrafficCyTotal]
console.log(tables[0] + ", " + othersValues + ", " + tables.length)
for (i = 0; i < tables.length; i++) { 
var row = eval(tables[i]).insertRow(7);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

cell1.innerHTML = "OTHERS";
cell2.innerHTML = othersValues[i*2].toLocaleString();
cell3.innerHTML = othersValues[i*2+1].toLocaleString();

var row2 = window[tables[i]].insertRow(8);
var totalcell1 = row2.insertCell(0);
var totalcell2 = row2.insertCell(1);
var totalcell3 = row2.insertCell(2);

totalcell1.innerHTML = "TOTAL";
totalcell2.innerHTML = totalValues[i*2].toLocaleString();
totalcell3.innerHTML = totalValues[i*2+1].toLocaleString();
}

});
