var app = angular.module('Airbnb');


function BecomeAHostControllerFn($state) {	
	var vm = this;
	vm.test = "kushal"
}

app.controller('BecomeAHostController',BecomeAHostControllerFn);
