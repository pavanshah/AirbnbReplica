var app = angular.module("Airbnb");

function signupModalControllerFn($uibModalInstance,loginService) {
	var vm = this;
	vm.user = {};
	vm.user.UserType = "User"
	vm.signupView = "signupMethod";
	vm.birthdayflag = false;
	
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

					var date = new Date();
					var bd = new Date(vm.user.birthdate);

					if(bd>date)
					{
						vm.birthdayflag = true;
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

}

app.controller('SignupModalController',signupModalControllerFn)