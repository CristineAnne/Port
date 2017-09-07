//Sample
d3.json("input/PortStats.json", function(error, json) {
              if (error) return console.warn(error);

	var table = dc.dataTable("#sample_table");
	var table2 = dc.dataTable("#sample_table2");
	var table3 = dc.dataTable("#sample_table3");

	var records = json;
					
//Dimensions
    var ndx = crossfilter(records),
		portDim = ndx.dimension(function(d){return d["Port Name"];}),
		regionalPortDim = ndx.dimension(function(d){return d["Port Category (Regional)"];}),
		portcallsPyDim = ndx.dimension(function(d){return +d["Total Port Calls (2016)"];}),
		portcallsCyDim = ndx.dimension(function(d){return +d["Total Port Calls (2017)"];}),
		cargothroughputPyDim = ndx.dimension(function(d){return +d["Total Cargo Throughput (2016)"];}),
		cargothroughputCyDim = ndx.dimension(function(d){return +d["Total Cargo Throughput (2017)"];}),
		containerPyDim = ndx.dimension(function(d){return +d["Total Container Traffic (2016)"];}),
		containerCyDim = ndx.dimension(function(d){return +d["Total Container Traffic (2017)"];}),
		rank = function (p) { return "" };		

//Functions

 // Add and count values of a column
        function reduceAdd(attrPY, attrCY) {
            return function(p,v) {
				++p.count;
				p.totalPY += +v[attrPY];
				p.totalCY += +v[attrCY];
                return p;
            };
        }
        function reduceRemove(attrPY, attrCY) {
            return function(p,v) {
				--p.count;
				p.totalPY -= -v[attrPY];
				p.totalCY -= -v[attrCY];
                return p;
            };
        }

        function reduceInit() {
          return {count:0, totalPY:0, totalCY:0};
        };

//Groups
	var groupedRegionalPortCallsDim = regionalPortDim.group().reduce(reduceAdd("Total Port Calls (2016)", "Total Port Calls (2017)"),reduceRemove("Total Port Calls (2016)", "Total Port Calls (2017)"),reduceInit);
	var groupedRegionalCargoDim = regionalPortDim.group().reduce(reduceAdd("Total Cargo Throughput (2016)", "Total Cargo Throughput (2017)"),reduceRemove("Total Cargo Throughput (2016)", "Total Cargo Throughput (2017)"),reduceInit);
	var groupedRegionalContainerDim = regionalPortDim.group().reduce(reduceAdd("Total Container Traffic (2016)", "Total Container Traffic (2017)"),reduceRemove("Total Container Traffic (2016)", "Total Container Traffic (2017)"),reduceInit);
	
	//Table
  var colspan = null;
  table
    .width(768)
    .height(480)
    .dimension(groupedRegionalPortCallsDim)
    .group(rank)
    .columns([function (d) { return d.key },
				function (d) { return d.value.totalPY.toLocaleString() },
				function (d) { return d.value.totalCY.toLocaleString() }])
    .sortBy(function (d) { return d.value.totalCY})
    .order(d3.descending)
	.size(5)
    table.render();	
	
//CARGO THROUGHPUT (M.T.)
//Table
  table2
    .width(768)
    .height(480)
    .dimension(groupedRegionalCargoDim)
    .group(rank)
    .columns([function (d) { return d.key },
				function (d) { return d.value.totalPY.toLocaleString() },
				function (d) { return d.value.totalCY.toLocaleString() }])
    .sortBy(function (d) { return d.value.totalCY})
    .order(d3.descending)
	.size(5)
    table2.render();



//CONTAINER TRAFFIC (in TEU)

//Table
  table3
    .width(768)
    .height(480)
    .dimension(groupedRegionalContainerDim)
    .group(rank)
    .columns([function (d) { return d.key },
				function (d) { return d.value.totalPY.toLocaleString() },
				function (d) { return d.value.totalCY.toLocaleString() }])
    .sortBy(function (d) { return d.value.totalCY})
    .order(d3.descending)
	.size(5)
    table3.render();

	
	
	var recordsByRegion = records.reduce(function(res, obj) {
	x = 0
	for (let re of res.__array) {
	if (re["Port Category (Regional)"] == obj["Port Category (Regional)"]) {
		re["Total Container Traffic (2016)"] += obj["Total Container Traffic (2016)"]
		re["Total Container Traffic (2017)"] += obj["Total Container Traffic (2017)"]
		re["Total Cargo Throughput (2016)"] += obj["Total Cargo Throughput (2016)"]
		re["Total Cargo Throughput (2017)"] += obj["Total Cargo Throughput (2017)"]
		re["Total Port Calls (2016)"] += obj["Total Port Calls (2016)"]
		re["Total Port Calls (2017)"] += obj["Total Port Calls (2017)"]
		x = 1
	}
	}
	if (x==0) {
	        res.__array.push(res[obj.Organizational_Role] = obj);
		console.log("There are " + "BG:" + obj["Port Category (Regional)"] + "  Port Calls:" + obj["Total Port Calls (2016)"]);
}
    return res;
	
}, {__array:[]}).__array

	console.log(JSON.stringify(recordsByRegion))

// sort records by (1)Port Calls, (2)Cargo Throughput, (3)Container Traffic, then create array of Port Name, PY, CY
// (1)Port Calls
	var portcalls = recordsByRegion.sort(function (a, b) {
	  return b["Total Port Calls (2017)"] - a["Total Port Calls (2017)"];
	});
	
	portcallsPort = new Array
		portcalls.forEach(function(d){
        portcallsPort.push(d["Port Category (Regional)"]);
    });

	portcallsPyTotal = new Array
		portcalls.forEach(function(d){
        portcallsPyTotal.push(d["Total Port Calls (2016)"]);
    });

	portcallsCyTotal = new Array
		portcalls.forEach(function(d){
        portcallsCyTotal.push(d["Total Port Calls (2017)"]);
    });

	console.log(JSON.stringify(portcallsCyTotal.reduce((a, b) => a + b, 0)));		
	console.log(JSON.stringify(portcallsCyTotal.slice(5,9).reduce((a, b) => a + b, 0)));		
	console.log(JSON.stringify(portcallsCyTotal.slice(0,5)));		
	
// (2)Cargo Throughput
	var cargothroughput = recordsByRegion.sort(function (a, b) {
	  return b["Total Cargo Throughput (2017)"] - a["Total Cargo Throughput (2017)"];
	});

	cargothroughputPort = new Array
		cargothroughput.forEach(function(d){
        cargothroughputPort.push(d["Port Category (Regional)"]);
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
	var containertraffic = recordsByRegion.sort(function (a, b) {
	  return b["Total Container Traffic (2017)"] - a["Total Container Traffic (2017)"];
	});

	containertrafficPort = new Array
	containertraffic.forEach(function(d){
        containertrafficPort.push(d["Port Category (Regional)"]);
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
var totalPortCallsPY = portcallsPyTotal.reduce((a, b) => a + b, 0);
var totalPortCallsCY = portcallsCyTotal.reduce((a, b) => a + b, 0);
var totalCargothroughputPyTotal = cargothroughputPyTotal.reduce((a, b) => a + b, 0);
var totalCargothroughputCyTotal = cargothroughputCyTotal.reduce((a, b) => a + b, 0);
var totalContainertrafficPyTotal = containertrafficPyTotal.reduce((a, b) => a + b, 0);
var totalContainertrafficCyTotal = containertrafficCyTotal.reduce((a, b) => a + b, 0);

var dataTable1 = document.getElementById("sample_table");
var dataTable2= document.getElementById("sample_table2");
var dataTable3= document.getElementById("sample_table3");

tables = ["dataTable1", "dataTable2", "dataTable3"]
totalValues = [totalPortCallsPY, totalPortCallsCY, totalCargothroughputPyTotal, totalCargothroughputCyTotal, totalContainertrafficPyTotal, totalContainertrafficCyTotal]
for (i = 0; i < tables.length; i++) { 
console.log(tables[i])
var row = window[tables[i]].insertRow(7);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

cell1.innerHTML = "TOTAL";
cell2.innerHTML = totalValues[i*2];
cell3.innerHTML = totalValues[i*2+1];
}
});
