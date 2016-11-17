var app = angular.module("Airbnb");

function loginModalControllerFn($uibModalInstance) {
	var vm = this;

	vm.ok = function () {
    	$uibModalInstance.close();
  	};

}

app.controller('LoginModalController',loginModalControllerFn)