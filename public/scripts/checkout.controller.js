var app = angular.module("Airbnb");

function CheckoutControllerFn($state,$stateParams,$http,bookingDataService) {
	var vm = this;
	vm.property = $stateParams.property;
	vm.trip_amount=0;
	vm.booking = bookingDataService.getBooking();
	vm.bookingDates = bookingDataService.getBooking().bookingDates;

	if($stateParams.property==null){
		
		
		vm.property = vm.booking.property;

	}

	console.log("Requesting Bill");
	$http.post('/CalculateBill',vm.booking).then(function(response){

		console.log(response.data.Bill_details);

		vm.Bill_details = response.data.Bill_details;
		vm.booking.trip_amount = response.data.Bill_details.Total_Bill;
	})

	vm.bookProperty = function(){

		$http.post("/bookProperty",vm.booking).
		then(function(response) {
			if(response.status==200){
				bookingDataService.deleteBooking();
				console.log("bookpropertyahdbadhkbda"+response.data.trip);
				$state.go("orderSuccess",{"trip":response.data.trip});
			}
			else if(response.status==401){
				openLoginModal();
			}
		})
	}

}

app.controller('CheckoutController',CheckoutControllerFn);