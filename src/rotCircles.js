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


var size = 2;
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
    .attr("transform", "translate(" + [w/2,h/2] + ")scale(0.5, 0.5)");

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

    var tinyCircles = chart.selectAll("g." + name)
        .data(data, function(d) { return d.index });

    tinyCircles.enter().append("svg:g")
        .attr("class", name)
        .append("svg:circle");

    tinyCircles.selectAll("circle")
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
