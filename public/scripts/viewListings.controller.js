var app = angular.module('Airbnb');

function viewListingsControllerFn($state) {
	
	var vm = this;

	vm.viewPropertyDetails = function() {
		$state.go("propertyDetails");
	}
}

app.controller('ViewListingsController',viewListingsControllerFn);