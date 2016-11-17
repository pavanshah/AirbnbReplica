var app = angular.module('Airbnb',['ui.bootstrap','ui.router','google.places']);

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('home',{
		url:"/",
		templateUrl:"public/views/home.html",
		controller:"HomeController",
		controllerAs:"vm"
	})

	.state('viewListings',{
		url:"/viewListings",
		templateUrl:"public/views/viewListings.html",
		controller:"ViewListingsController",
		controllerAs:"vm"
	})

	.state('propertyDetails',{
		url:"/propertyDetails",
		templateUrl:"public/views/propertyDetails.html",
		controller:"PropertyDetailsController",
		controllerAs:"vm"
	})
	//$location.path('/prelogin');
	//html5mode(true);
});
