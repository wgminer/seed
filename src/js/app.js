'use strict';

angular.module('seed', ['ngRoute', 'ngCookies', 'angularMoment']);
var app = angular.module('seed');

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/splash.html',
            controller: 'MainCtrl'
        })
});

app.run(function ($rootScope, $location) {



});