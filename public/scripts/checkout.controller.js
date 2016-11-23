var app = angular.module("Airbnb");

function CheckoutControllerFn($state,$stateParams,$http,bookingDataService) {
	var vm = this;
	vm.property = $stateParams.property;
	
	vm.booking = bookingDataService.getBooking();
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
	}

}

app.controller('CheckoutController',CheckoutControllerFn);