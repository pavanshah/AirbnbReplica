var app = angular.module('Airbnb');


function mainControllerFn($uibModal,loginService,$state,$log) {
 	var vm =this;
 	vm.user = {};

 	loginService.getUserProfile().
 	then(function(userData) {
 		vm.user = userData;
 	},function(err) {
 		vm.user = {};
 	});

 	vm.homeNavigation = function () {
 		
 		if(vm.user.UserType=="Admin"){
 			$state.go("admin");
 		}
 		if(vm.user.UserType=="Host"){
 			$state.go("becomehost");
 		}
 		if(vm.user.UserType=="User"){
 			$state.go("home");
 		}
 	}

 	vm.logout = function() {
 		loginService.logout().
 		then(function(response) {
 			vm.user = {};
 			$state.go("home");
 		});
 	}

 	vm.trips = function() {
 		$state.go("userHome");
 	}

 	vm.profile = function()
 	{
 		$state.go("userProfile");
 	}

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

		     vm.user = userData;
		    

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
 } 


app.controller('MainController',mainControllerFn);