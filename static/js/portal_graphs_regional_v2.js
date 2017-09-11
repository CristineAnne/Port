//Sample
d3.json("input/PortStats_v2.json", function(error, json) {
              if (error) return console.warn(error);
	var records = json;
	
	var table = dc.dataTable("#sample_table");
	var table2 = dc.dataTable("#sample_table2");
	var table3 = dc.dataTable("#sample_table3");
					
//Dimensions
    var pCalls = crossfilter(records["Port Calls"]),
		regionalPortDimPCalls = pCalls.dimension(function(d){return d["Port District Office"];}),
		portcallsPyDim = pCalls.dimension(function(d){return +d["2016 TOTAL"];}),
		portcallsCyDim = pCalls.dimension(function(d){return +d["2017 TOTAL"];}),
		cThroughput = crossfilter(records["Cargo Throughput"]),
		regionalPortDimCThroughput = cThroughput.dimension(function(d){return d["Port District Office"];}),
		cargothroughputPyDim = cThroughput.dimension(function(d){return +d["2016 TOTAL"];}),
		cargothroughputCyDim = cThroughput.dimension(function(d){return +d["2017 TOTAL"];}),
		container = crossfilter(records["Container Traffic"]),
		regionalPortDimContainer = container.dimension(function(d){return d["Port District Office"];}),
		containerPyDim = container.dimension(function(d){return +d["2016 TOTAL"];}),
		containerCyDim = container.dimension(function(d){return +d["2017 TOTAL"];}),
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
	var groupedRegionalPortCallsDim = regionalPortDimPCalls.group().reduce(reduceAdd("2016 TOTAL", "2017 TOTAL"),reduceRemove("2016 TOTAL", "2017 TOTAL"),reduceInit);
	var groupedRegionalCargoDim = regionalPortDimCThroughput.group().reduce(reduceAdd("2016 TOTAL", "2017 TOTAL"),reduceRemove("2016 TOTAL", "2017 TOTAL"),reduceInit);
	var groupedRegionalContainerDim = regionalPortDimContainer.group().reduce(reduceAdd("2016 TOTAL", "2017 TOTAL"),reduceRemove("2016 TOTAL", "2017 TOTAL"),reduceInit);
	
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

	
	
	var recordsByRegionPCalls = records["Port Calls"].reduce(function(res, obj) {
	x = 0
	for (let re of res.__array) {
	if (re["Port District Office"] == obj["Port District Office"]) {
		re["2016 TOTAL"] += obj["2016 TOTAL"]
		re["2017 TOTAL"] += obj["2017 TOTAL"]
		x = 1
	}
	}
	if (x==0) {
	        res.__array.push(res[obj.Organizational_Role] = obj);
}
    return res;
}, {__array:[]}).__array

	var recordsByRegionCThroughput = records["Cargo Throughput"].reduce(function(res, obj) {
	x = 0
	for (let re of res.__array) {
	if (re["Port District Office"] == obj["Port District Office"]) {
		re["2016 TOTAL"] += obj["2016 TOTAL"]
		re["2017 TOTAL"] += obj["2017 TOTAL"]
		x = 1
	}
	}
	if (x==0) {
	        res.__array.push(res[obj.Organizational_Role] = obj);
}
    return res;
}, {__array:[]}).__array

	var recordsByRegionCTraffic = records["Container Traffic"].reduce(function(res, obj) {
	x = 0
	for (let re of res.__array) {
	if (re["Port District Office"] == obj["Port District Office"]) {
		re["2016 TOTAL"] += obj["2016 TOTAL"]
		re["2017 TOTAL"] += obj["2017 TOTAL"]
		x = 1
	}
	}
	if (x==0) {
	        res.__array.push(res[obj.Organizational_Role] = obj);
}
    return res;
}, {__array:[]}).__array


// sort records by (1)Port Calls, (2)Cargo Throughput, (3)Container Traffic, then create array of Port Name, PY, CY
// (1)Port Calls
	var portcalls = recordsByRegionPCalls.sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});

	
	portcallsPort = new Array
		portcalls.forEach(function(d){
        portcallsPort.push(d["Port District Office"]);
    });


	portcallsPyTotal = new Array
		portcalls.forEach(function(d){
        portcallsPyTotal.push(d["2016 TOTAL"]);
    });

	portcallsCyTotal = new Array
		portcalls.forEach(function(d){
        portcallsCyTotal.push(d["2017 TOTAL"]);
    });
	
// (2)Cargo Throughput
	var cargothroughput = recordsByRegionCThroughput.sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});

	cargothroughputPort = new Array
		cargothroughput.forEach(function(d){
        cargothroughputPort.push(d["Port District Office"]);
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
	var containertraffic = recordsByRegionCTraffic.sort(function (a, b) {
	  return b["2017 TOTAL"] - a["2017 TOTAL"];
	});

	containertrafficPort = new Array
	containertraffic.forEach(function(d){
        containertrafficPort.push(d["Port District Office"]);
    });

	containertrafficPyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficPyTotal.push(d["2016 TOTAL"]);
    });

	containertrafficCyTotal = new Array
	containertraffic.forEach(function(d){
        containertrafficCyTotal.push(d["2017 TOTAL"]);
    });
	
	
	new Chart(document.getElementById("port-calls"), {
	type: 'horizontalBar',
	data: {
	labels: portcallsPort,
	datasets: [
	{ label: "2016",
	  backgroundColor: "#6b486b",
	  data: portcallsPyTotal},
	{ label: "YTD 2017",
	  backgroundColor: "#ff8c00",
	  data: portcallsCyTotal
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
			labels: cargothroughputPort,
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: cargothroughputPyTotal},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: cargothroughputCyTotal
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
			labels: containertrafficPort,
			datasets: [
			{ label: "2016",
			  backgroundColor: "#6b486b",
			  data: containertrafficPyTotal},
			{ label: "YTD 2017",
			  backgroundColor: "#ff8c00",
			  data: containertrafficCyTotal
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
var row = eval(tables[i]).insertRow(7);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);

cell1.innerHTML = "TOTAL";
cell2.innerHTML = totalValues[i*2].toLocaleString();
cell3.innerHTML = totalValues[i*2+1].toLocaleString();
}
});
