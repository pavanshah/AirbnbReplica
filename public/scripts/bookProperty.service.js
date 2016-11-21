var app = angular.module("Airbnb");

function bookPropertyFn($http) {
	
	function bookProperty(details) {
		// body...
	}

	return{
		bookProperty:bookProperty
	}
}

app.service("bookPropertyFn",bookPropertyFn);