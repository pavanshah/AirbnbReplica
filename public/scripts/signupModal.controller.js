var app = angular.module("Airbnb");

function signupModalControllerFn($uibModalInstance) {
	var vm = this;
	vm.signupView = "signupMethod";

	vm.changeSignupView = function (currentView) {
		vm.signupView = currentView;
	}

	vm.ok = function () {
    	$uibModalInstance.close();
  	};

}

app.controller('SignupModalController',signupModalControllerFn)