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
				userData = response.data.user;
				return userData;
			}
		},function(err) {
			return err;
		})
	}

	function logout() {
		/*return $http.*/
	}

	return{
		login:login,
		getUserProfile:getUserProfile,
		logout:logout
	}
}



app.service('loginService',loginServiceFn);