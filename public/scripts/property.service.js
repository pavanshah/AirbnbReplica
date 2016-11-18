var app = angular.module("Airbnb");


function propertyServiceFn($http) {

	function getProperties(propertyFilters) {
		
		


	}


	return{
		getProperties:getProperties

	}
}


app.service("propertyService",propertyServiceFn);