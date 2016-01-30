'use strict';

var app = angular.module('print-issues', ['dndLists']);

app.service('Local', function ($q, $rootScope) {

    var self = this;

    self.keys = [];
    self.issues = [];
    
    self.options = {
    	layout: 'four'
    };

});

app.controller('AppCtrl', function ($scope, $rootScope, Local) {

	$scope.options = Local.options;
	$scope.fields = Local.keys;

	$scope.$on('uploaded', function(event, index) {
   		$scope.fields = Local.keys;
	});

	$scope.setLayout = function (layout) {
		$scope.options.layout = Local.options.layout = layout;
	}

});







