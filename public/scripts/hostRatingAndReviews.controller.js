var app = angular.module("Airbnb");


var HostRatingAndReviewsFn = function ($http,$state,tripsService) {
	var vm = this;
	var getHostTrips = function(){
		console.log("getting host trips");
		$http.get('/getHostTrips').then(function(response){
			console.log(response.data.trip);
			vm.trips = response.data.trip;
		
		});
		
	};
		
		
		
		
	
	getHostTrips();
	
	
};




app.controller("hostRatingAndReviews",HostRatingAndReviewsFn);