var app = angular.module("Airbnb");

function bookPropertyServiceFn($http) {
	
	function bookProperty(details) {
		return $http.post('/bookProperty', details).
		then(function(res){
			if(res.status==200)
			{
				return res.status;
			}
		});
	}

	return{
		bookProperty:bookProperty
	}
}

app.service("bookPropertyService",bookPropertyServiceFn);