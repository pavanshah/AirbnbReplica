var app = angular.module("Airbnb");

function signupModalControllerFn($uibModalInstance) {
	var vm = this;
	vm.signupView = "signupMethod";
	vm.required = false;
	vm.emailflag = false;
	
	vm.changeSignupView = function (currentView) {
		vm.signupView = currentView;
	}

	vm.ok = function () {
		vm.required = true;
		vm.emailflag = false;

		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(!re.test(vm.email) && vm.email != null)
	    	{
	    		vm.emailflag = true;
	    		console.log("invalid email");
	    	}
		
		if(vm.firstname == null || vm.lastname == null || vm.email == null || vm.password == null || vm.emailflag == true)
			{
				//something is invalid
			}
		else
			{
				$uibModalInstance.close();
			}
  	};
  	
  	
  	vm.setEmailFlag = function()
  	{
  		vm.emailflag = false;
  	}

}

app.controller('SignupModalController',signupModalControllerFn)