d3.json("input/PortStats.json", function(error, json) {
              if (error) return console.warn(error);
//Sample
	var table = dc.dataTable("#sample_table");
	var table2 = dc.dataTable("#sample_table2");
	var table3 = dc.dataTable("#sample_table3");

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
cell2.innerHTML = othersValues[i*2];
cell3.innerHTML = othersValues[i*2+1];

var row2 = eval(tables[i]).insertRow(8);
var totalcell1 = row2.insertCell(0);
var totalcell2 = row2.insertCell(1);
var totalcell3 = row2.insertCell(2);

totalcell1.innerHTML = "TOTAL";
totalcell2.innerHTML = totalValues[i*2];
totalcell3.innerHTML = totalValues[i*2+1];
}
});
