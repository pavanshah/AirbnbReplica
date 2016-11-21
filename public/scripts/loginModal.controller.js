var app = angular.module("Airbnb");

function loginModalControllerFn($uibModalInstance) {
	var vm = this;
	vm.userData = {};
	vm.required = false;
	vm.ok = function () {
		vm.required = true;
		
		if(vm.userData.email == null || vm.userData.password == null)
			{
				//Either of the inputs is not provided
			}
		else
			{
				$uibModalInstance.close(vm.userData);
			}
  	};


  	vm.login = function(){

  	}

}

app.controller('LoginModalController',loginModalControllerFn)