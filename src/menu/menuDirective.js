/**
 * Created by Shweta on 5/9/15.
 *
 * this directive handles the ui routing through the circular website menu
 */

myapp.directive('fancyMenu', function(){

    var directiveDefObject = {
            restrict : 'E',

            templateUrl :'src/menu/menuDirectiveContent.html' ,

            controller : function($scope){

                //broadcast
                $scope.changeView= function(path){

                    $scope.$emit("loadPage",path);
                };

            },

            link : function(scope){

                /*
                 * fancy menu code
                 *
                 * */

                var aboutC = { "x": 0, "y": 0, "r": 80, "color" : "#33CCCC", path : '/about', text : "About"};
                var publicationsC = { "x": 0, "y": 0, "r": 80, "color" : "#33CCCC", path : '/publications', text:"Publications"};
                var skillsC= { "x": 0, "y": 0, "r": 80, "color" : "#33CCCC", path : '/skills', text: "Skills"};

                var menuCircles = [aboutC, publicationsC, skillsC];

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
                           .attr("dx", "-.85em").attr("dy", ".25em")
                           .style('visibility','visible' )
                           .ease('elastic')
                           .duration(1000);

                       //TODO avoid doing this
                       d3.selectAll('#texts')
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
                var r6 = 410;


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
                                return "#33CCCC"
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

            }
        };
    return directiveDefObject;

});
