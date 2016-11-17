var app = angular.module('Airbnb');


function mainControllerFn($uibModal) {
 	var vm =this;
 	
 	vm.openLoginModal = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'public/views/loginModal.html',
	      	 size: "md",
	      	 controller:'LoginModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true
	    });
 	}

 	vm.openSignupModal = function() {

 		var modalInstance = $uibModal.open({
		     templateUrl: 'public/views/signupModal.html',
	      	 size: "md",
	      	 controller:'SignupModalController',
	      	 controllerAs:"vm"
	    });
 	}
 } 


app.controller('MainController',mainControllerFn);