var app = angular.module("Airbnb");

function signupModalControllerFn($uibModalInstance,loginService) {
	var vm = this;
	vm.user = {};
	vm.user.UserType = "User"
	vm.signupView = "signupMethod";
	vm.required = false;
	vm.emailflag = false;
	
	vm.birthDatePopUp = {
    	opened: false
  	};

  	vm.openBirthDatePopUp = function() {
	    vm.birthDatePopUp.opened = true;
	};
  		//date formats
  	vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  	//default formate
	vm.format = vm.formats[1];

	vm.changeSignupView = function (currentView) {
		vm.signupView = currentView;
	}

	vm.ok = function () {
		vm.required = true;
		vm.emailflag = false;

		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(!re.test(vm.user.email) && vm.user.email != null)
	    	{
	    		vm.emailflag = true;
	    		console.log("invalid email");
	    	}
		
		if(vm.user.firstname == null || vm.user.lastname == null || vm.user.email == null || vm.user.password == null || vm.emailflag == true)
			{
				//something is invalid
				return;
			}
		else
			{
				loginService.signup(vm.user).
				then(function(response) {
					if(response.status==200){
						$uibModalInstance.close(vm.user);	
						vm.serverError = "";	
					}
					
				},function(err) {
					if(err.status==400){
						vm.serverError = err.data.result;
					}
				})
				
			}
  	};
  	
  	
  	vm.setEmailFlag = function()
  	{
  		vm.emailflag = false;
  	}

}

app.controller('SignupModalController',signupModalControllerFn)