var app = angular.module('Airbnb',['ui.bootstrap','ui.router','google.places','nvd3','ngMaterial','ngAnimate','ngAria','ngRoute','ngSanitize']);

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
	
	
	.state('adminLogin',{
		url:"/adminLogin",
		templateUrl:"public/views/adminLogin.html",
		controller:"AdminLoginController",
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
		templateUrl:"public/views/checkout.html",
		params:{
			property:null
		},
		controller:"CheckoutController",
		controllerAs:"vm"
	})

	.state('orderSuccess',{
		url:"/orderSuccess",
		templateUrl:"public/views/orderSuccess.html"
	})

	.state('userBill',{
		url:'/userBill',
		templateUrl:"public/views/finalReciept.html"
	})
	.state('userHome',{
		url:'/userHome',
		templateUrl:"public/views/userHome.html",
		controller:"TripsController",
		controllerAs:"vm"
	})
	.state('logout',{
		url:'/logout',
		templateUrl:'public/views/logoutPage.html'
	})
	.state('userProfile',{
		url:'/userProfile',
		templateUrl:'public/views/userProfile.html',
		controller:"UpdateProfileController",
		controllerAs:"vm"
	})
	.state('hostProfile',{
		url:'/hostProfile',
		templateUrl:'public/views/hostProfile.html'
	})
	.state('hostEditProfile',{
		url:'/hostProfileEdit',
		templateUrl:'public/views/hostEditProfile.html'
	})
	//$location.path('/prelogin');
	//html5mode(true);
	
});
