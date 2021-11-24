// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    let data = google.visualization.arrayToDataTable([
        ['Effort', 'Amount given'],
        ['My all',     100],
    ]);

    let options = {
        pieHole: 0.5,
        pieSliceTextStyle: {
            color: 'black',
        },
        legend: 'none'
    };

    let chart = new google.visualization.PieChart(document.getElementById('donut_single'));
    chart.draw(data, options);
}