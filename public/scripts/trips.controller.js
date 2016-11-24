var app = angular.module("Airbnb");


var TripControllerFn = function ($http,tripsService) {
	
	var vm = this;

	vm.rate = 1;
  	vm.max = 5;
  	vm.isReadonly = false;

  	vm.hoveringOver = function(value) {
    vm.overStar = value;
    //alert(vm.overStar);
    //vm.percent = 100 * (value / vm.max);
  };

  	vm.clickStar = function(value) {
  		vm.ratedStar = value;
  		alert(vm.ratedStar);
  	};
	

	vm.trips ={};
	
	vm.temp = function() {
		console.log("inside star");
	}

	var getTrips = function(){
		tripsService.getTrips().
		then(function (response) {
			console.log(response);

			if(response.length!=0){
              angular.forEach(response,function(response) {
              if(!response.property.propertyPictures || response.property.propertyPictures.length==0){
                response.property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              }
            })}

			vm.trips = response;
		});
		console.log("fewrctwatcretcerceetet"+vm.trips);
	}
	getTrips();
};

app.controller("TripsController",TripControllerFn);