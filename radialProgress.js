/**
 * Created by Shweta Purushe on 4/15/2015.
 */
var colors = {
    'pink': '#E1499A',
    'yellow': '#f0ff08',
    'green': '#47e495'
};

var svg = d3.select('#radialProgress').append('svg').attr('width', 500).attr('height', 500);

var arc = d3.svg.arc()
    .startAngle(Math.PI/2)
    .endAngle(2*Math.PI)
    .innerRadius(100)
    .outerRadius(85);

svg.append("path")
    .attr("d", arc)
    .attr("transform", "translate(200,200)");