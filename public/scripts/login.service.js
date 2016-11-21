var app = angular.module("Airbnb");


function loginServiceFn($http) {
	
	var userData = {};

	function login(userData) {
		
		return $http.post("/userLogIn",userData).
		then(function(response) {
			if(response.status==200){
				if(response.data.userLoggedIn){
					return response.data.userLoggedIn;
				}
			}
		})
	}

	function getUserProfile() {
		return $http.get("/getUserProfile").
		then(function(response) {
			if(response.status==200){
				userData = response.data;
				return userData;
			}
		})
	}

	return{
		login:login,
		getUserProfile:getUserProfile
	}
}



app.service('loginService',loginServiceFn);