var app = angular.module("Airbnb");


var HostRatingAndReviewsFn = function ($http,$state,tripsService) {
	var vm = this;
	vm.uploadPic = function(tripId){
  		console.log("in photo upload");

		filepicker.pick(
		  {
		    mimetype: 'image/*',
		    container: 'modal',
		    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
		  },
		  function(Blob){
		    console.log(JSON.stringify(Blob.url));
		    //vm.user.profilepic=Blob.url;
		    vm.trips[tripId].photo = Blob.url;
		    console.log(vm.trips[tripId].photo);
		    //vm.trips[tripId].uploadButton = true;

		    //vm.UpdateProfile();
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });

	}
	
	var getHostTrips = function() {
		console.log("getting host trips");
		$http.get('/getHostTrips').then(function(response){
			console.log(response.data.trip);
			vm.trips = response.data.trip;
			
		});
		
	};
		
		
		
		
	
	getHostTrips();
	
	
};




app.controller("hostRatingAndReviews",HostRatingAndReviewsFn);