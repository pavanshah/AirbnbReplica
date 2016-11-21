var app = angular.module("Airbnb");

function loginModalControllerFn($uibModalInstance) {
	var vm = this;
	vm.userData = {};
	vm.ok = function () {
    	$uibModalInstance.close(vm.userData);
  	};


  	vm.login = function(){

  	}

}

app.controller('LoginModalController',loginModalControllerFn)