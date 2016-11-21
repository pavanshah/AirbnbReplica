var app = angular.module('Airbnb');


function mainControllerFn($uibModal,loginService) {
 	var vm =this;
 	vm.user = {};
 	vm.openLoginModal = function() {

 		var modalInstance = $uibModal.open({
 			 animation : true,
		     templateUrl: 'public/views/loginModal.html',
	      	 size: "md",
	      	 controller:'LoginModalController',
	      	 controllerAs:"vm",
	      	 backdrop : true
	    });

	     modalInstance.result.then(function (userData) {
		     vm.userData = userData;
		     loginService.login(userData).
		     then(function(isLoggedIn) {
		     	if(isLoggedIn){
		     		loginService.getUserProfile().
		     		then(function(user) {
		     			vm.user = user;
		     		})
		     	}
		     })

		     console.log("userData",vm.userData);
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
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