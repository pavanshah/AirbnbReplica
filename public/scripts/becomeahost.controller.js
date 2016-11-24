var app = angular.module('Airbnb');


function BecomeAHostControllerFn($state,$http) {	
	var vm = this;
	//vm.value = 1;
	
	vm.entireplacefunc = function(value){
		console.log("entire place clicked");
		console.log("location",vm.travelLocation);
		vm.value = value;
		console.log("value is " +vm.value);
		if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
			return;
		} else {
			var lat = vm.travelLocation.geometry.location.lat();
			var long = vm.travelLocation.geometry.location.lng();
			$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long}});
		}
	}
	
	vm.Starthost = function(){
		console.log("host button clicked");
		$http.post("/starthosting").
		then(function(response) {
			console.log("here----");
			console.log(response);
			if(response.data.result==400){
				console.log("user not logged in");
			}
		})
		
	}
		
}

app.controller('BecomeAHostController',BecomeAHostControllerFn);
