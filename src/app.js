/**
 * Created by Shweta on 4/16/2015.
 */
var myapp = angular.module('app', ['ui.router']);

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
        .state('publications', {
            url : '/publications',
            templateUrl : 'src/publications/pubPartial.tpl.html',
            data : {activetab : 'publications'}
        });
});


myapp.controller("appController", ['$scope', '$location', function($scope, $location){
    //this.state = $state;
    this.progress = "Website under construction!!"
    $scope.$on('loadPage', function(event , path){
        $location.path(path);
        $scope.$apply();
    });

} ]);

