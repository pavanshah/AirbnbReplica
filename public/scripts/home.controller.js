var app = angular.module('Airbnb');

function homeControllerFn($state) {
	
	var vm = this;

	vm.searchListings = function() {
		$state.go("viewListings");
	}

	//vm.checkInDate = new Date();
 	vm.checkInDatePopUp = {
    	opened: false
  	};

  	vm.checkOutDatePopUp = {
    	opened: false
  	};
  	//date formats
  	vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];

  	//default formate
	vm.format = vm.formats[2];
 	vm.openCheckinDate = function() {
	    vm.checkInDatePopUp.opened = true;
	};

	vm.openCheckOutDate = function() {
	    vm.checkOutDatePopUp.opened = true;
	};
}

app.controller('HomeController',homeControllerFn);