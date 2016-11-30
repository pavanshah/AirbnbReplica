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
	/*"user": {
	    "firstname": "Kushal",
	    "lastname": "Joshi",
	    "email": "kushal.d.joshi@gmail.com",
	    "user_id": "364400311",
	    "UserType": "host",
	    "address": "San Jose",
	    "birthYear": "1990",
	    "birthMonth": "07",
	    "birthDay": "17",
	    "gender": "Male"
	  }
	  */
	$scope.getHostDetails = function(){
console.log("geting host details");
		$http.get('/getHostDetails').then(function(response){
			console.log(response.data);
			$scope.firstname = response.data.user.firstname;
			$scope.lastname = response.data.user.lastname;
			$scope.email = response.data.user.email;
			$scope.phonenumber = response.data.user.phone;
			$scope.gender = response.data.user.gender;
			$scope.address = response.data.user.address;
			$scope.birthYear = response.data.user.birthYear;
			$scope.birthDay = response.data.user.birthDay;
			$scope.birthMonth = response.data.user.birthMonth;
			vm.host = response.data.user;
			console.log(vm.host);
	});
	}
	
	$scope.save = function(){
		console.log("save button clicked");
		vm.host.firstname = $scope.firstname;
		vm.host.lastname = $scope.lastname;
		vm.host.email =$scope.email;
		vm.host.phonenumber =$scope.phonenumber;
		vm.host.gender = $scope.gender;
		vm.host.address = $scope.address;
		vm.host.birthYear = $scope.birthYear;
		vm.host.birthDay = $scope.birthDay;
		vm.host.birthMonth = $scope.birthMonth;
		console.log("calling updateProfile");
		$http.post('/updateHost',{"user":vm.host}).then(function(response){

			console.log(response.data);

		})
		
		/*$http.post('/updateHost',{"firstname":$scope.firstname,"lastname":$scope.lastname,
			"email":$scope.email,"phonenumber":$scope.phonenumber,"gender":$scope.gender,
			"address":$scope.address,"birthYear":$scope.birthYear,"birthDay":$scope.birthDay,
			"birthMonth":$scope.birthMonth
			}).then(function(response){
				console.log(response.data);
			});*/
	}
	$scope.getHostDetails();
}
	
	
		


app.controller('hostProfile',HostProfileFn);
