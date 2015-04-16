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

