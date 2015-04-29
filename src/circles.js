/**
 * Created by Shweta on 4/29/2015.
 */
var margin = {top: 5, right: 5, bottom: 5, left: 5};

var rCircle = { "x": 100, "y": 100, "radius": 20, "color" : "pink", endX : 100, endY: 200};
var stataCircle = { "x": 100, "y": 100, "radius": 20, "color" : "purple",endX : 200, endY: 100};
var pythonCircle= { "x": 100, "y": 100, "radius": 20, "color" : "#3399FF", endX : 200, endY: 150};

var compEngines = [rCircle, stataCircle, pythonCircle];

var svg = d3.select('#blah')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .append('g')
    .attr("fill", "#193550")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;

//http://jsfiddle.net/kuv3z/2/
var wACircle = svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', 75)
    .style("fill", "yellow");



var engineCircle = svg.selectAll('circles')
    .data(compEngines)
    .enter()
    .append('circle')
    .on('mouseover', function(d){
        d3.select(this).transition()
            .attr('r', 30);
    })
    .on('mouseout', function(d){
        d3.select(this).transition()
            .duration(1000)
            .attr('r', function(d){return d.radius; });
    });

var engineCircleAttr = engineCircle
    .attr('cx', function(d){return d.x;})
    .attr('cy', function(d){return d.y;})
    .attr('r', function(d){return d.radius;})
    .style('visibility', 'hidden')
    .attr('fill', function(d){return d.color;});


wACircle
    .on('click', function(){

        engineCircle.transition()
            .attr('cx', function(d){return d.endX;})
            .attr('cy', function(d){return d.endY;})
            .style('visibility', 'visible')
            .ease('elastic')
            .duration(1000);


    });