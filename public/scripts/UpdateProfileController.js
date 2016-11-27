var app = angular.module("Airbnb");

function UpdateProfileControllerFn($state,$http,$scope) {
	var vm = this;

	vm.PopulateUserForm = function(){

		$http.get('/getUserProfile').then(function(response){

		console.log(response.data.user);
		
		vm.user=response.data.user;
		if(vm.user.profilepic==undefined||vm.user.profilepic==null){
			console.log("as the pic is:"+vm.user.profilepic);
			console.log("setting default image");
			vm.user.profilepic="/public/images/generic-profile.png"
		}

		//vm.user.profilepic="https://cdn.filestackcontent.com/CIKj9BXVQvm2F3AlQaih";
		//console.log(vm.user.firstname);
	});


	vm.UpdateProfile = function() {

		console.log("calling updateProfile");
		$http.post('/updateUser',{"user":vm.user}).then(function(response){

			console.log(response.data);
			vm.PopulateUserForm();
			vm.showAlert=true;

		})
	}

$scope.closeAlert = function()
{
	vm.showAlert=false;
}

	vm.updateProfilePic = function(){

		filepicker.pick(
		  {
		    mimetype: 'image/*',
		    container: 'modal',
		    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
		  },
		  function(Blob){
		    console.log(JSON.stringify(Blob.url));
		    vm.user.profilepic=Blob.url;
		    console.log(vm.user.profilepic);

		    vm.UpdateProfile();
		  },
		  function(FPError){
		    console.log(FPError.toString());
		  });

	}

	}
	vm.PopulateUserForm();
	
	/*vm.booking = bookingDataService.getBooking();
	vm.bookingDates = bookingDataService.getBooking().bookingDates;

	if($stateParams.property==null){
		
		
		vm.property = vm.booking.property; 
	}

	vm.bookProperty = function(){

		$http.post("/bookProperty",vm.booking).
		then(function(response) {
			if(response.status==200){
				bookingDataService.deleteBooking();
				$state.go("orderSuccess");
			}
			else if(response.status==401){
				openLoginModal();
			}
		})
	}*/

}

app.controller('UpdateProfileController',UpdateProfileControllerFn);