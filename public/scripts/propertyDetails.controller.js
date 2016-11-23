var app = angular.module('Airbnb');

function propertyDetailsControllerFn($state,$stateParams,$http) {
	
	var vm = this;
	vm.property = {};
	function getPropertyDetails(property) {
		$http.post("/SearchPropertyById",{property_id:property.property_id}).
		then(function(response) {
			console.log(response);
			if(response.status==200){

				vm.property= response.data;
				console.log("property",vm.property);
			}
			else
			{
				console.log(response);
			}
		},function(err)
		{

					console.log(err.data.response);
					//Open the login popup
				
		});
	}

	getPropertyDetails($stateParams.property);
	console.log($stateParams);
}

app.controller('PropertyDetailsController',propertyDetailsControllerFn);