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
filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', '7');


var arc = d3.svg.arc()
    .startAngle(Math.PI/2)
    .endAngle(2*Math.PI)
    .innerRadius(100)
    .outerRadius(85);

svg.append("path")
    .attr("d", arc)
    .attr("transform", "translate(200,200)")
    .style('fill', colors.pink)
    .attr('filter','url(#blurFilter)');//applying filter on arc;


//using filters on rect
/*var rect =      svg.append('rect')
                .attr('width', 200)
                .attr('height', 200).attr('fill', 'yellow')
                .attr('stroke','green')
                .attr('stroke','green')
                .attr('stroke-width', 3)
                .attr('filter','url(#blurFilter)');*/
