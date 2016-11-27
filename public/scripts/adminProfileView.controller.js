var app = angular.module('Airbnb');


function AdminProfileViewControllerFn($state,$scope,$http,$rootScope,$mdDialog) {	
	var vm = this;
	console.log("loaded data");
	console.log($rootScope.showProfile);
	$scope.firstname = "";
	$scope.reviews = [];
	$scope.showSuccess = false;
	
	
	$scope.authorize = function(){
		
		console.log("Authorize user");
		$scope.authuser = {"id":$rootScope.showProfile}; 
		$http({
			  method: 'POST',
			  url: '/authorizeUser',
			  data: $scope.authuser
			  			  			  
			}).then(function successCallback(response) {
				console.log(response.data);
				if(response.data.result == "success"){
					$scope.status = "active";
					$scope.showSuccess = true;
					
				}
			})

	}
	
	$scope.deleteUser = function(){
		console.log("Delete user");
		$scope.authuser = {"id":$rootScope.showProfile}; 
		$http({
			  method: 'POST',
			  url: '/deleteUserFromAdmin',
			  data: $scope.authuser
			  			  			  
			}).then(function successCallback(response) {
				console.log(response.data);
				if(response.data.result == "success"){
					
					var confirm = $mdDialog.confirm()
	                  .title('Successfully deleted the user!')
	                  .textContent("Lets go back to the list")
	                  .ariaLabel('Deleted!')
	                  
	                  .ok('Ok');
	                  
	                  $mdDialog.show(confirm).then(function() {
	                     console.log("Do u think it ll work");
	     				window.location.assign("#/adminHostSearch");
	                     }, function() {
	                    	 console.log("it worked");
	                  });
					
				}
			})

	}
	
	$scope.$on('$viewContentLoaded', function() {
		$scope.hostQuery = {"id":$rootScope.showProfile};
		
		$http({
			method : "GET",
			url : '/getProfileForAdmin',
			params : $scope.hostQuery 
		}).success(function(details) {
			console.log("got output from backend");
			console.log(details.result[0].firstname);
			$scope.firstname = details.result[0].firstname;
			console.log("firstname is:"+$scope.firstname );
			$scope.lastname = details.result[0].lastname;
			console.log("lasname is:"+vm.lastname );
			$scope.status = details.result[0].user_status;
			var dateObj = new Date(details.result[0].birthdate);
			var month = dateObj.getUTCMonth() + 1; //months from 1-12
			var day = dateObj.getUTCDate();
			var year = dateObj.getUTCFullYear();
			$scope.birthdate = month + '/'+day+'/'+year;
			$scope.address = details.result[0].address.street+','+details.result[0].address.city+','+details.result[0].address.state+','+details.result[0].address.country;
			$scope.rating = details.result[0].avgrating;
			$scope.phone = details.result[0].phone;
			$scope.email = details.result[0].email;
			$scope.reviews = details.result[0].Reviews;
			
			
			
		})
		
	})
}


app.controller('AdminProfileViewController',AdminProfileViewControllerFn);