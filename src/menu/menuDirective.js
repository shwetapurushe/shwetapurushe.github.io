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

            link : function(scope, elem, attrs){


                var w = 500;
                var h = 500;

                var aboutC = { "x": 0, "y": 0, "radius": 80, "color" : "#33CCCC", endX : 180, endY: 380, path : '/about', text : "About"};
                var publicationsC = { "x": 0, "y": 0, "radius": 80, "color" : "#33CCCC",endX : 380, endY: 180, path : '/publications', text:"Publications"};
                var skillsC= { "x": 0, "y": 0, "radius": 80, "color" : "#33CCCC", endX : 380, endY: 280, path : '/skills', text: "Skills"};

                var menuCircles = [aboutC, publicationsC, skillsC];


                //var elem = svg.selectAll("g")
                //    .data(json.nodes)
                //
                ///*Create and place the "blocks" containing the circle and the text */
                //var elemEnter = elem.enter()
                //    .append("g")
                //    .attr("transform", function(d){return "translate("+d.x+",80)"})
                //
                ///*Create the circle for each block */
                //var circle = elemEnter.append("circle")
                //    .attr("r", function(d){return d.r} )
                //    .attr("stroke","black")
                //    .attr("fill", "white")
                //
                ///* Create the text for each block */
                //elemEnter.append("text")
                //    .attr("dx", function(d){return -20})
                //    .text(function(d){return d.label});

                var menuItems = d3.select('#mainC').selectAll('g')
                    .data(menuCircles);

                var menuItem = menuItems
                            .enter()
                            .append("g")
                            .append('circle')
                            .attr("r", function(d){return d.r} )
                            .attr("", function(d){return d.r} )
                            .on('mouseover', function(d){
                            d3.select(this).transition()
                                .attr('r', 100);
                            })
                            .on('mouseout', function(d){
                            d3.select(this).transition()
                                .duration(1000)
                                .attr('r', function(d){return d.radius; });
                                })
                                .on('click', function(d){
                                    scope.changeView(d.path);
                                });;

                //var menuItem = d3.select('#mainC').selectAll('circles')
                //    .data(menuCircles)
                //    .enter()
                //    .append('g')
                //    .append('circle')
                //    .on('mouseover', function(d){
                //        d3.select(this).transition()
                //            .attr('r', 100);
                //    })
                //    .on('mouseout', function(d){
                //        d3.select(this).transition()
                //            .duration(1000)
                //            .attr('r', function(d){return d.radius; });
                //    })
                //    .on('click', function(d){
                //        scope.changeView(d.path);
                //    });
                //

                var menuCircleAttr = menuItem
                    .attr('cx', function(d){return d.x;})
                    .attr('cy', function(d){return d.y;})
                    .attr('r', function(d){return d.radius;})
                    .style('visibility', 'hidden')
                    .attr('fill', function(d){return d.color;});

               d3.select('#orangeSun')
                    .on('click', function(){

                        menuItem.transition()
                            .attr('cx', function(d){return d.endX;})
                            .attr('cy', function(d){return d.endY;})
                            .style('visibility', 'visible')
                            .ease('elastic')
                            .duration(1000);


                    });
//
//var r1 = 90;
//var r2 = 150;
//var r3 = 220;
//var r4 = 280;
//var r5 = 340;
                var r6 = 410;


                var size = 1;
                var running;

                var click = function()
                {
                    running = !running;
                    if(running)
                        setTimeout(update_circles, 80);

                };


                d3.select('#svg').on('click', click);

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

                    var chart = d3.select('#mainC');
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
                            return "#FF6600"
                        })
                        .attr("stroke-width", 9)
                        .attr("fill", "none");
                };

                var rot = 0;

                var update_circles = function() {
                    rot += Math.PI /156;//decides the speed and direction (clockwise vs anticlockwise)of rotation

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

            }
        }
    return directiveDefObject;

});
