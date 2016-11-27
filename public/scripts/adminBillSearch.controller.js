var app = angular.module('Airbnb');


function AdminBillSearchControllerFn($state,$scope,$http,$rootScope) {	
	var vm = this;
	
	$scope.billQuery = {"date":"","month":"","query":"new","querytype":$scope.queryType};
	
	$scope.showBill = function(id){
		$rootScope.billid = id;		
		window.location.assign("/#/adminBillView");
		
	}

	$http({
		method : "GET",
		url : '/getBillForAdmin',
		params : $scope.billQuery 
	}).success(function(details) {
		console.log(details.result);
		$scope.values = details.result;
	})
	
	vm.searchDetails = function(){
		console.log(typeof vm.date);
		console.log(vm.month);
		
		$scope.billQuery = {"date":"","month":"","query":"new","querytype":$scope.queryType};
		
		if(typeof vm.date != "undefined" && vm.date != ""){
			$scope.billQuery.date = vm.date;
			$scope.billQuery.query = "updated";
		}
		if(typeof vm.month != "undefined" && vm.month != ""){
			$scope.billQuery.month =  vm.month;
			$scope.billQuery.query = "updated";
		}
				
		
		$http({
			method : "GET",
			url : '/getBillForAdmin',
			params : $scope.billQuery 
		}).success(function(details) {
			console.log(details.result);
			$scope.values = details.result;
			$scope.billQuery.date = "";
			$scope.billQuery.month = "";
		})
		
	}
	$scope.showDate = true;
	$scope.queryType = "date";
	vm.month = "";
	vm.typeChanged = function(){
		if($scope.querytype == "querydate"){
			console.log("Date");
			$scope.queryType = "date";
			vm.month = "";
			$scope.showDate = true;
		}
		else if($scope.querytype == "querymonth"){
			console.log("Month");
			$scope.queryType = "month";
			vm.date = "";
			$scope.showDate = false;
		}
		else{
			console.log("Date");
			vm.month = "";
			$scope.queryType = "date";
			$scope.showDate = true;
		}
	}
}
	
	
	app.controller('AdminBillSearchController',AdminBillSearchControllerFn);