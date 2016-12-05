var app = angular.module('Airbnb');


function AdminHostSearchControllerFn($state,$scope,$http,$rootScope) {
	console.log("Inside admin host search");
	var vm = this;
	
	
	vm.showProfile = function(id){
		console.log("profile clicked");
		console.log(id);
		$rootScope.showProfile = id;
		window.location.assign("/#/adminProfileView");
	}
	
	$scope.values = [];
	$scope.space = " ";
	$scope.hostQuery = {"type":"","address":"","query":"new"};
	
	
	vm.searchDetails = function(){
		console.log(typeof $scope.type);
		console.log($scope.address);
		
		
		if(typeof $scope.type != "undefined" && $scope.type != ""){
			$scope.hostQuery.type = $scope.type;
			$scope.hostQuery.query = "updated";
		}
		if(typeof $scope.address != "undefined" && $scope.address != ""){
			$scope.hostQuery.address = $scope.address.address_components[0].long_name;
			$scope.hostQuery.query = "updated";
		}
		
		
		$http({
			method : "GET",
			url : '/getHostsForAdmin',
			params : $scope.hostQuery 
		}).success(function(details) {
			console.log(details.result);
			$scope.values = details.result;
			$scope.hostQuery.address = "";
			$scope.hostQuery.type = "";
		})
		
	}
	$scope.totalDisplayed = 20;
	$scope.showMore = function(argument) {
		$scope.totalDisplayed = $scope.totalDisplayed + 20;
	}
	
	$http({
		method : "GET",
		url : '/getHostsForAdmin',
		params : $scope.hostQuery 
	}).success(function(details) {
		console.log(details.result);
		$scope.values = details.result;
	})

	if(angular.isUndefined(vm.travelLocation) || vm.travelLocation == null){
		return;
	} else {
		var lat = vm.travelLocation.geometry.location.lat();
		var long = vm.travelLocation.geometry.location.lng();
		$state.go("viewListings",{'filters':{'latitude':lat,'longitude':long}});
	};
	
	
	
	
	
}	
app.controller('AdminHostSearchController',AdminHostSearchControllerFn);