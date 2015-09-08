/**
 * Created by Shweta on 4/16/2015.
 */
angular.module('app', ['ui.router', 'ui.bootstrap', 'app.about']);

angular.module('app').config(function($stateProvider, $urlRouterProvider){


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
            controller : 'aboutPageController',
            controllerAs : 'aCtrl',
            data : {
                activetab: 'about'
            }
        })
        .state('publications', {
            url : '/publications',
            templateUrl : 'src/publications/pubPartial.tpl.html',
            data : {activetab : 'publications'}
        });
});


angular.module('app').controller("appController", function(){
    //this.state = $state;
    this.progress = "Website under construction!!"
} );
