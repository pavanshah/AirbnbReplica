var app = angular.module("Airbnb");

var BillControllerFn = function ($http, $state, $stateParams) {
	var vm = this;
	vm.trip = $stateParams.trip;
	vm.bill={};
	vm.getBill = function() {
		console.log("khadchaadhbad"+vm.trip.trip_id);
		$http.post("/getBillByTripId",{"trip_id":vm.trip.trip_id}).
		then(function(response) {
			if(response.status == 200)
			{
				console.log("ljabdfjldbsjbajbj"+response.data.bill.trip_amount);
				vm.bill = response.data.bill;
			}
		});
	}
	if(vm.trip != null)
	{
		vm.getBill();
	}
}

app.controller("BillController", BillControllerFn);