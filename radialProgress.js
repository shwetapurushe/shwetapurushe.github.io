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
