var app = angular.module("Airbnb");

function loginModalControllerFn($uibModalInstance) {
	var vm = this;
	vm.userData = {};
	vm.required = false;
	vm.ok = function () {
		vm.required = true;
    	$uibModalInstance.close(vm.userData);
  	};


  	vm.login = function(){

  	}

}

app.controller('LoginModalController',loginModalControllerFn)