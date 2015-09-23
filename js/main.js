/**
 * Created by Shweta on 4/16/2015.
 */
var myapp = angular.module('app', [ 'app.project','ui.bootstrap','app.collapsible', 'ui.router', 'ngAnimate']);

myapp.config(function($stateProvider, $urlRouterProvider){


    $stateProvider
        .state('skills', {
            url : '/skills',
            templateUrl : "src/skills/skillPartial.tpl.html",
            data : {
                activetab: 'skills'
            }
        })
        .state('about', {
            url : '/about',
            templateUrl: "src/about/aboutPartial.tpl.html",
            data : {
                activetab: 'about'
            }
        })
        .state('projects',{
            url : '/projects',
            templateUrl : "src/projects/projectsPartial.html",
            data : {
                activetab : 'projects'
            }
        })
        .state('publications', {
            url : '/publications',
            templateUrl : 'src/publications/pubPartial.tpl.html',
            data : {activetab : 'publications'}
        });
});


myapp.controller("appController", ['$scope', '$location', function($scope, $location){
    //this.state = $state;
    this.progress = ""
    $scope.$on('loadPage', function(event , path){
        $location.path(path);
        $scope.$apply();
    });

} ]);


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

/**
 * Created by Shweta on 9/10/2015.
 */
(function(){
    angular.module('app.collapsible', []);
    angular.module('app.collapsible').directive('collapsePanel',collapsePanelComponent );

    function collapsePanelComponent (){
        return {
            restrict : 'E',
            scope : {
                urlstring : '@',
                heading : '@'
            },
            templateUrl : 'src/collapsibles/collapsible_Panel_Partial.html',
            controller : collapseController,
            controllerAs : 'coCtrl',
            bindToController: true,
            link : function (scope, elem, attrs){
            }
        }// end of ddo
    }

    //collapseController.$inject= ['$scope'];
    function collapseController (){
        var coCtrl = this;

        coCtrl.isCollapsed = true;
        coCtrl.collapseContent = collapseContent;

        function collapseContent (){
            coCtrl.isCollapsed = ! coCtrl.isCollapsed;
        }
    }
})();
/**
 * Created by Shweta on 9/8/2015.
 */
/*
 * fancy menu code
 *
 * */

var aboutC = { "x": 0, "y": 0, "r": 80, "color" : "#5bc0de", path : '/about', text : "About"};
var publicationsC = { "x": 0, "y": 0, "r": 80, "color" : "#5bc0de", path : '/publications', text:"Publications"};
var projectsC = { "x": 0, "y": 0, "r": 80, "color" : "#5bc0de", path : '/projects', text:"Projects"};
var skillsC= { "x": 0, "y": 0, "r": 80, "color" : "#5bc0de", path : '/skills', text: "Skills"};

var menuCircles = [aboutC, projectsC, skillsC];

d3.select('#mainC').selectAll('g')
    .data(menuCircles)
    .enter()
    .append('g')
    .attr('id', "blahs")
    .each(function(){
        d3.select(this).append('circle')
            .attr('id', 'myCircles')
            .attr('cx', function(d){return d.x;})
            .attr('cy', function(d){return d.y;})
            .attr('r', function(d){return d.r;})
            .style('visibility', 'hidden')
            .attr('fill', function(d){return d.color;})
            .on('mouseover', function(){
                d3.select(this).transition()
                    .attr('r', 100);
            })
            .on('mouseout', function(){
                d3.select(this).transition()
                    .duration(1000)
                    .attr('r', function(d){return d.r; });
            })
            .on('click', function(d){
                scope.changeView(d.path);
            });
        d3.select(this).append("text")
            .text(function(d){return d.text}).style('visibility','hidden' )
            .attr('id', "texts")
            .attr("font-color", "#FF6600")
            .attr("font-size", '30px')
            .on('click', function(d){
                scope.changeView(d.path);
            });


    });

d3.select('#orangeSun')
    .on('click', function(){

        var nofMenuItems = menuCircles.length;
        var rot = Math.PI /156;

        var data3 = make_circle(225, nofMenuItems, rot, 80);

        //changing data bound to elements
        d3.selectAll('#myCircles')
            .data(data3)
            .enter();

        d3.selectAll('#myCircles')
            .transition()
            .attr('cx', function(d){return d.cx;})
            .attr('cy', function(d){return d.cy;})
            .style('visibility', 'visible')
            .ease('elastic')
            .duration(1000);

        d3.selectAll('#texts')
            .data(data3)
            .enter();

        d3.selectAll('#texts').transition()
            .attr("x", function(d){return d.cx ;})
            .attr("y", function(d){return d.cy ;})
            .attr("fill", "white")
            .attr("dx", "-.95em").attr("dy", ".25em")
            .style('visibility','visible' )
            .ease('elastic')
            .duration(1000);

        //TODO avoid doing this
        d3.selectAll('#texts')
            .data(menuCircles)
            .enter();

        d3.selectAll('#myCircles')
            .data(menuCircles)
            .enter();


    });


/*
 * Rotating border code
 *
 * */


//
//var r1 = 90;
//var r2 = 150;
//var r3 = 220;
//var r4 = 280;
//var r5 = 340;
var r6 = 340;


//var size = 1;
var running;

var click = function()
{
    running = !running;
    if(running)
        setTimeout(update_circles, 80);

};


d3.select('#svg').on('click', click);

//draws the circle
var make_circle = function(r,n,offset, size)
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

    var chart = d3.select('#mainC');
    var tinyCircles = chart.selectAll("g." + name)
        .data(data, function(d) { return d.index });

    tinyCircles.enter().append("svg:g")
        .attr("class", name)
        .append("svg:circle");

    tinyCircles.selectAll("circle")
        .data(data, function(d) { return d.index })
        .attr("cx", function(d) { return d.cx})
        .attr("cy", function(d) { return d.cy})
        .attr("r", function(d) {return d.r})
        .attr("stroke", function(d){
            if(d.index % 2 == 1) {
                return "#5bc0de"
            }
            return "#FF6600"
        })
        .attr("stroke-width", 9)
        .attr("fill", "none");
};

var rot = 0;

var update_circles = function() {
    rot += Math.PI /156;//decides the speed and direction (clockwise vs anticlockwise)of rotation
    n = 90;
    var data6 = make_circle(r6, n, rot, 1);
    step =  4;
    var offset = -15;
    circle_factory("six", data6, offset, step);

    if(running)
        setTimeout(update_circles, 100);
};


running = true;
update_circles();

/**
 * Created by Shweta on 5/9/15.
 *
 * this directive handles the ui routing through the circular website menu
 */
myapp.directive('fancyMenu', function(){

        return {
            restrict : 'E',
            templateUrl :'src/menu/menuDirectiveContent.html' ,
            controller : function($scope){

                //broadcast
                $scope.changeView= function(path){

                    $scope.$emit("loadPage",path);
                };

            },
            link : function(scope){
                var dom_element_to_append_to = document.getElementById('menuContainer');

                var aboutC = {"r": 20 , "R": 180, color : '#00CCFF' , speed: 3, phi0: 400, path : '/about', text : "About Me"};
                var projectsC = {"r": 20 ,"R": 60, color: '#FF7C66',  speed: 3, phi0: 200, path : '/projects', text:"Projects"};
                var skillsC= {"r": 20 , "R": 120,color: '#705891', speed: 3,phi0: 100, path : '/skills', text: "Skills"};
                var menuCircles = [aboutC, projectsC, skillsC];

                var home = {"r": 10, "color" : "#0e0706;", path : '/index', text : "h", image : 'om.jpg'};

                var config = {
                    menu_Options : menuCircles,
                    container : dom_element_to_append_to,
                    home : home

                };

                var pl = new window.d3_viz.planetarium();
                pl.initialize_planetarium(config);
                pl.render_planetarium();

                //hack using d3 in directive....TODO
               d3.selectAll('#menuC').on('click', function (d){scope.changeView(d.path);})
            }
        };

});

/**
 * Created by Shweta on 9/9/2015.
 */
if (!this.d3_viz)
    this.d3_viz = {};
(function(){
    //constructor
    function planetarium (){
        this._svg ;
        this._t0;
        this._margin;
        this._width;
        this._height;
        this._container;
        this._home;
        this._menuOptions;

    }

    window.d3_viz.planetarium = planetarium;

    var p = planetarium.prototype;

    p.initialize_planetarium = function (config){
        this._margin =  {top: 20, right: 20, bottom: 20, left: 20};
        this._container = config.container;
        this._width = this._container.offsetWidth - this._margin.left - this._margin.right;
        this._height = this._container.offsetHeight - this._margin.top - this._margin.bottom;
        this._menuOptions = config.menu_Options;
        this._home = config.home;

        this._svg = d3.select(this._container).insert('svg')
            .attr('width', this._width)
            .attr('height', this._height);

        //this._svg.append('circle')
        //    .attr("r", this._home.r)
        //    .attr("cx", this._width/2)
        //    .attr("cy", this._height/2)
        //    .attr("fill", this._home.color)
        //this._svg.append('g')
        //    .attr("x", this._width/2)
        //    .attr("y", this._height/2)
        //    .attr("width", 20).attr("height", 20)
        //    .append("span")
        //    .attr("class", "fa fa-home");

    };

    p.render_planetarium = function (){
       var pl = this;
        pl._t0 = Date.now();

       pl._container = pl._svg.append('g')
            .attr("transform", "translate(" + pl._width/2 + "," + pl._height/2 + ")");

        //pl._container.append('g')
        //    .attr("x", this._width/2)
        //    .attr("y", this._height/2)
        //    .attr("width", "20px").attr("height", "20px")
        //    .append("span")
        //    .attr("class", "fa fa-home");

        var g = pl._container.selectAll('g.menuOpts').data(pl._menuOptions).enter()
            .append('g')//this g contains the menu circles and their labels
            .on("mouseover", pl.stop_animation)
            .on("mouseout", pl.start_animation);

           g.each(function(d){
                d3.select(this).append('circle').attr('class', 'menuOrbits').attr("r", d.R );
                d3.select(this).append('g').attr('id', 'menuG')
                    .append('circle').attr("id", "menuC")
                    .attr("r", d.r).attr('cx', d.R).attr('cy', 0).attr("fill", d.color);

            });

        d3.timer(function() {
            var delta = (Date.now() - pl._t0);
            pl._svg.selectAll("#menuC").attr("transform", function(d) {
                return "rotate(" + d.phi0 + delta* d.speed/400 + ")";
            });
        })
    };
    p.start_animation = function (){
        var mc = d3.select(this).selectAll('#menuC');
        mc.transition().duration(1000).attr('r', function(d){return d.r; });
        d3.selectAll("text").remove();
    };

    p.stop_animation = function (){
        var mc = d3.select(this).selectAll('#menuC');
        var mg = d3.select(this).selectAll('#menuG');
        mc.transition().attr('r', 30);
        mg.append("text").text(function(d){return d.text})
            .attr('fill', (function(d){return d.color}))
            .attr('class', 'menuFonts');//appending text to g not circle
    };

})();
/**
 * Created by Shweta on 9/8/2015.
 * controlls the About partial
 */
(function (){
    angular.module('app.project', []);
    angular.module('app.project').controller('carouselController' , carouselController )

    function carouselController (){
        var pCtrl = this;
        pCtrl.blah = 'Shweta!!';

        pCtrl.interval = 5000;
        pCtrl.noWrapSlides = false;
        pCtrl.imagePath = "css/images/";
        pCtrl.slides = [
            {
                text : 'Data Analysis and Visualization',
                image :  pCtrl.imagePath+'Analyst.png'
            },
            {
                text: 'Metadata',
                image :  pCtrl.imagePath+'Metadata.png'
            },
            {
                text: 'Projects',
                image :  pCtrl.imagePath+'wa_Projects.png'
            },
            {
                text: 'Projects List',
                image :  pCtrl.imagePath+'WA_projects_listview.png'
            }
        ];

    };
})();