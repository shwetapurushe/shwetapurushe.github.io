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

                var aboutC = {"r": 20 , "R": 180, color : '#00CCFF' , speed: 7, phi0: 400, path : '/about', text : "About Me"};
                var projectsC = {"r": 20 ,"R": 60, color: '#FF7C66',  speed: 3, phi0: 200, path : '/projects', text:"Projects"};
                var skillsC= {"r": 20 , "R": 120,color: '#705891', speed: 5,phi0: 600, path : '/skills', text: "Skills"};
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
