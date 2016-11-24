var app = angular.module("Airbnb");

var TripControllerFn = function ($http,tripsService) {
	
	var vm = this;

	vm.trips ={};
	
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