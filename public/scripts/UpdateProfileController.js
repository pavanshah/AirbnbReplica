var app = angular.module("Airbnb");

function UpdateProfileControllerFn($state,$http) {
	var vm = this;

	vm.PopulateUserForm = function(){

		$http.get('/getUserProfile').then(function(response){

		console.log(response.data.user);
		
		vm.user=response.data.user;
		console.log(vm.user.firstname);



	});
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