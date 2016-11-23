var app = angular.module("Airbnb");

function CheckoutControllerFn($state,$stateParams,$http) {
	var vm = this;
	vm.property = $stateParams.property;

	vm.bookProperty = function(){

		$http.post("/bookProperty",vm.property).
		then(function(response) {
			if(response.status==200){
				$state.go("orderSuccess");
			}
			else if(response.status==401){
				openLoginModal();
			}
		})
	}

}

app.controller('CheckoutController',CheckoutControllerFn);