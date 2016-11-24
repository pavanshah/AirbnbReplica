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
	

	vm.trips ={};
	
	vm.temp = function() {
		console.log("inside star");
	}

	vm.rating = 0;
	var getTrips = function(){
		tripsService.getTrips().
		then(function (response) {
			console.log(response);

			if(response.length!=0){
              angular.forEach(response,function(response) {
              if(!response.property.propertyPictures || response.property.propertyPictures.length==0){
                response.property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              }
              response.rating = 0;
              $http.post('/getRatingsForTrip',{"host_id":response.host_id}).
              then(function(rating) {
              	if(rating.status == 200)
              	{
              		console.log("kad fjdaf"+rating.data.result.feedback);
              		if(rating.data.result != null)
              		{
	              		response.rating = 1;
	              		response.rate = rating.data.result.ratings;
	              		response.review = rating.data.result.feedback;

	              		console.log("adfbhadbfa"+response.review);
              		}
              	}
              });

            })}

			vm.trips = response;
		});
		console.log("fewrctwatcretcerceetet"+vm.trips);
	}
	getTrips();
};

app.controller("TripsController",TripControllerFn);