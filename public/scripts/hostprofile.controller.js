var app = angular.module('Airbnb');


function HostProfileFn($state,$scope,$http) {	
	var vm = this;
	console.log("inside this controller");
	$scope.firstname = '';
	$scope.lastname = '';
	$scope.email = '';
	$scope.phonenumber = '';
	$scope.gender = '';
	$scope.address = '';
	$scope.birthYear = '';
	$scope.birthDay = '';
	$scope.birthMonth = '';
	
	$scope.save = function(){
		console.log("save button clicked");
		console.log($scope.firstname);
		console.log($scope.lastname);
		console.log($scope.email);
		console.log($scope.phonenumber);
		console.log($scope.gender);
		console.log($scope.address);
		console.log($scope.birthYear);
		console.log($scope.birthDay);
		console.log($scope.birthMonth);
		$http.post('/updateHost',{"firstname":$scope.firstname,"lastname":$scope.lastname,
			"email":$scope.email,"phonenumber":$scope.phonenumber,"gender":$scope.gender,
			"address":$scope.address,"birthYear":$scope.birthYear,"birthDay":$scope.birthDay,
			"birthMonth":$scope.birthMonth
			}).then(function(response){

			console.log(response.data);

		})
		
		
		
	}
	
	
		
}

app.controller('hostProfile',HostProfileFn);
