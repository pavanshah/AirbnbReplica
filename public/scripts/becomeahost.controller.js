var app = angular.module('Airbnb');


function BecomeAHostControllerFn($state) {	
	var vm = this;
	//vm.value = 1;
	vm.entireplacefunc = function(value){
		console.log("entire place clicked");
		vm.value = value;
		console.log("value is " +vm.value);
		
		var lat = vm.travelLocation.geometry.location.lat();
		var long = vm.travelLocation.geometry.location.lng();
		$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long}});
	}
	
	
		
}

app.controller('BecomeAHostController',BecomeAHostControllerFn);
