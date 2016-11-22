var app = angular.module('Airbnb');

function propertyDetailsControllerFn($state,$stateParams,$http) {
	
	var vm = this;
	vm.property = {};
	function getPropertyDetails(propertyId) {
		$http.post("/SearchPropertyById",propertyId).
		then(function(response) {
			if(response.status==200){
				vm.property= response.data;
				console.log("property",vm.property);
			}
		})
	}

	getPropertyDetails($stateParams.property_id);
	console.log($stateParams);
}

app.controller('PropertyDetailsController',propertyDetailsControllerFn);