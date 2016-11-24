var app = angular.module('Airbnb');


function AdminHostSearchControllerFn($state,$scope,$http) {
	console.log("Inside admin host search");
	var vm = this;
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
		
		/*if(typeof $scope.type == "undefined" && typeof $scope.address == "undefined"){
			console.log("inside if");
			$scope.hostQuery = {"type":"","address":"","query":"new"};
		}		
		else{
			$scope.hostQuery = {"type":$scope.type,"address":$scope.address.address_components[0].long_name,"query":"updated"};
			console.log("inside else");
		}*/
		
		//$scope.hostQuery = {"type":$scope.type,"address":$scope.address.address_components[0].long_name,"query":"updated"};
		
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
	}
	
	
	
}	
app.controller('AdminHostSearchController',AdminHostSearchControllerFn);