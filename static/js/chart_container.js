new Chart(document.getElementById("container-traffic"), {
type: 'horizontalBar',
data: {
	labels: ["SOUTHERN LUZON", "NCR NORTH", "NCR SOUTH", "SOUTHERN MINDANAO", "NORTHERN MINDANAO"],
	datasets: [
	{ label: "2016",
	  backgroundColor: "#6b486b",
	  data: [5428742, 5234230, 3283987, 2201370, 2044083]},
	{ label: "YTD 2017",
	  backgroundColor: "#ff8c00",
	  data: [4387941, 3479054, 3097684, 2015832, 1930013]
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
				},
				ticks: { fontSize: 8 }
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
