/**
 * Created by Shweta on 4/16/2015.
 */
var myapp = angular.module('app', ['ui.router']);

myapp.config(function($stateProvider, $urlRouterProvider){

});


myapp.controller("appController", function($state){
    this.state = $state;
    this.progress = "Website under construction!!"
} );


/**
 * Created by Shweta on 4/29/2015.
 */
var margin = {top: 5, right: 5, bottom: 5, left: 5};

var rCircle = { "x": 100, "y": 100, "radius": 20, "color" : "pink", endX : 100, endY: 200};
var stataCircle = { "x": 100, "y": 100, "radius": 20, "color" : "purple",endX : 200, endY: 100};
var pythonCircle= { "x": 100, "y": 100, "radius": 20, "color" : "#3399FF", endX : 200, endY: 150};

var compEngines = [rCircle, stataCircle, pythonCircle];

var svg = d3.select('#showCase')
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
/**
 * Created by Shweta Purushe on 4/15/2015.
 * Starting with understanding d3 paths and path generators
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
    .innerRadius(100).outerRadius(95)
    .startAngle(0).endAngle(0);

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
//label.text("Shweta");

var startP = 0;
var endP = 0.90;
var count = Math.abs((endP - startP)/0.01);
var step = endP > startP ? 0.01:-0.01;
var progress = startP;
var correctP = d3.format('0%');

function makeProgress (){
    label.text(correctP(progress));
    fuzzyArc.attr("d", arc.endAngle(Math.PI * 2 * progress));
    boldArc.attr("d", arc.endAngle(Math.PI *2 * progress));
}

(function animateProgress(){

    makeProgress();
    if(count > 0){
        count--;
        progress += step;
        setTimeout(animateProgress, 30)

    }

})();

//checking from mac
/**
 * Created by Shweta on 4/29/2015.
 */
//rotating circles in d3 inspired from http://bl.ocks.org/enjalot/1379988


var w = 500;
var h = 500;
//
//var r1 = 90;
//var r2 = 150;
//var r3 = 220;
//var r4 = 280;
//var r5 = 340;
var r6 = 410;


var size = 5;
var running;

var click = function()
{
    running = !running;
    if(running)
        setTimeout(update_circles, 80);

};

//setup svg canvas
svg = d3.select("#showCase")
    .append("svg:svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "spiral")
    .on("click", click);


chart = svg.append("svg:g")
    .attr("class", "base_group")
    //.attr("transform", "translate(" + [w/2,h/2] + ")scale(0.25, 0.25)");

//draws the circle
var make_circle = function(r,n,offset)
{
    var data = [];
    for(var i = 0; i < n; i++)
    {
       var theta = offset + i * 2 * Math.PI / n;
        var sz = Math.abs(size/4 * Math.sin(i*Math.PI)) + size;
        data.push({
            cx: r * Math.cos(theta),
            cy: r * Math.sin(theta),
            angle: theta,
            index: i,
            r: sz });
    }
    return data;
};

var circle_factory = function(name, data, offset, step)
{

    var boxes = chart.selectAll("g." + name)
        .data(data, function(d) { return d.index });

    boxes.enter().append("svg:g")
        .attr("class", name)
        .append("svg:circle");

    boxes.selectAll("circle")
        .data(data, function(d) { return d.index })
        .attr("cx", function(d,i) { return d.cx})
        .attr("cy", function(d,i) { return d.cy})
        .attr("r", function(d) {return d.r})
        .attr("stroke", function(d,i){
            if(d.index % 2 == 1) {
                return "#33CCCC"
            }
            return "#CC0000"
        })
        .attr("stroke-width", 9)
        .attr("fill", "none");
 };

var rot = 0;

var update_circles = function() {
    rot += Math.PI /96;//decides the speed and direction (clockwise vs anticlockwise)of rotation

    n = 90;
    var data6 = make_circle(r6, n, rot);
    step =  4;
    var offset = -15;
    circle_factory("six", data6, offset, step);

    if(running)
        setTimeout(update_circles, 100);
};


running = true;
update_circles();
