var app = angular.module('Airbnb');

function homeControllerFn($state,$http) {
	
	var vm = this;

	vm.searchListings = function() {
		console.log("location",vm.travelLocation);

		if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
			return;
		}

		if (angular.isUndefined(vm.checkInDate) || angular.isUndefined(vm.checkOutDate) || vm.checkInDate==null || vm.checkOutDate==null) {
			return;
		}
		//console.log("lat location",);
		var lat = vm.travelLocation.geometry.location.lat();
		var long = vm.travelLocation.geometry.location.lng();

		/*$http.post("/SearchPropertyByDistance",{'latitude':lat,'longitude':long}).
		then(function(response) {
			console.log("nearby locations",response.data);
		});*/
		$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long,start_date:vm.checkInDate,end_date:vm.checkOutDate}});
	}

	//vm.checkInDate = new Date();
 	vm.checkInDatePopUp = {
    	opened: false
  	};

  	vm.checkOutDatePopUp = {
    	opened: false
  	};
  	//date formats
  	vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  	//default formate
	vm.format = vm.formats[2];
 	vm.openCheckinDate = function() {
	    vm.checkInDatePopUp.opened = true;
	};

	vm.openCheckOutDate = function() {
	    vm.checkOutDatePopUp.opened = true;
	};


	vm.findProperty = function () {
		

		
	}


}

app.controller('HomeController',homeControllerFn);