var app = angular.module('Airbnb');


function AddPropertyControllerFn($state,$stateParams,$http) {
	
	var vm = this;
	vm.property = {};

	}

app.controller('AddPropertyController',AddPropertyControllerFn);