var app = angular.module('Airbnb',['ui.bootstrap','ui.router','google.places','nvd3']);

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
		controllerAs:"vm",
		params: {
            filters: null
        },
	})

	
	.state('admin',{
		url:"/admin",
		templateUrl:"public/views/admin.html",
		controller:"AdminController",
		controllerAs:"vm"
	})
	
	.state('propertyDetails',{
		url:"/propertyDetails",
		templateUrl:"public/views/propertyDetails.html",
		controller:"PropertyDetailsController",
		controllerAs:"vm",
		params:{
			property:null
		}
	})
	
	.state('becomeahost',{
		url:"/becomeahost",
		templateUrl:"public/views/becomeahost.html",
		controller:"BecomeAHostController",
		controllerAs:"vm"
	})

	.state('checkout', {
		url:"/checkout",
		templateUrl:"public/views/checkout.html"

	})
	//$location.path('/prelogin');
	//html5mode(true);
	
});
