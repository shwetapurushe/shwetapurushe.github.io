/**
 * Created by Shweta Purushe on 4/15/2015.
 */
var colors = {
    'pink': '#FF00FF',
    'yellow': '#f0ff08',
    'green': '#47e495'
};

var svg = d3.select('#radialProgress').append('svg').attr('width', 500).attr('height', 500);

//defs
var defs = svg.append('defs').attr('id', 'def');
//filter
var filter = defs.append('filter').attr('id', 'blurFilter');
filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '7');//the more the stdDev, the more the scatter;

//path generator
var arc = d3.svg.arc()
    .startAngle(Math.PI/2).endAngle(2*Math.PI)
    .innerRadius(100).outerRadius(90);

var engineArc = d3.svg.arc()
                .startAngle(0).endAngle(Math.PI * 2)
                .innerRadius(100).outerRadius(95);


var containerG = svg.append('g').attr("transform", "translate(200,200)");
var backGArc = containerG.append("path").attr("d", engineArc)
               .style("fill", "black").attr("fill-opacity", 0.5);
//draws the actual arc
var fuzzyArc = containerG.append("path")
                .attr("d", arc)
                .style('fill', colors.pink)
                .attr('filter','url(#blurFilter)');/*applying filter on arc;*/
var boldArc = containerG.append("path").attr("d", arc).attr("fill", colors.pink);
//text
var label = containerG.append("text").attr("fill", colors.pink).attr("text-anchor", "middle").attr("dy", "0.35em");
label.text("Shweta");
