/*var app = angular.module('Airbnb');

app.controller('AdminController',['$scope',function($scope){
	$scope.test = "keerthi";
}]);*/

var app = angular.module('Airbnb');


function AdminControllerFn($state) {	
	var vm = this;
	vm.test = "yashas"
}

app.controller('AdminController',AdminControllerFn);
