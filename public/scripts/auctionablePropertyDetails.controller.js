var app = angular.module('Airbnb');

function auctionablePropertyDetailsControllerFn($state,$stateParams,$http,$uibModal,loginService,bookingDataService) {
	
	var vm = this;
	vm.property = {};
	
	//vm.bookingDates = bookingDataService.getBooking().bookingDates;
	
	function getPropertyDetails(property) {
		$http.post("/SearchPropertyById",{property_id:property.property_id}).
		then(function(response) {
			console.log(response);
			if(response.status==200){

				vm.property= response.data;
				vm.availStartDate = new Date(vm.property.property_start_date);
				//vm.availStartDate = vm.availStartDate.getFullYear()+'-' + (vm.availStartDate.getMonth()+1) + '-'+vm.availStartDate.getDate()
				vm.availEndDate = new Date(vm.property.property_end_date);
				//vm.availEndDate = vm.availEndDate.getFullYear()+'-' + (vm.availEndDate.getMonth()+1) + '-'+vm.availEndDate.getDate()
				
				console.log("property",vm.property);
			}
			else
			{
				console.log(response);
			}
		},function(err)
		{

					console.log(err);
					//Open the login popup
				
		});

	}

	function goToCheckoutPage() {
		$state.go("checkout",{property:vm.property});
	}

	function openLoginModal() {
	
		var modalInstance = $uibModal.open({
	 			 animation : true,
			     templateUrl: 'public/views/loginModal.html',
		      	 size: "md",
		      	 controller:'LoginModalController',
		      	 controllerAs:"vm",
		      	 backdrop : true
		    });

		     modalInstance.result.then(function (userData) {
			     vm.userData = userData;
			     loginService.login(userData).
			     then(function(isLoggedIn) {
			     	if(isLoggedIn){
			     		loginService.getUserProfile().
			     		then(function(user) {
			     			vm.user = user;
			     		});
			     		goToCheckoutPage();
			     		//bookProperty();
			     	}
			     })

			     console.log("userData",vm.userData);
			    }, function () {
			     // $log.info('Modal dismissed at: ' + new Date());
			});
			  
	 	
	}

	vm.authenticateUser = function() {
		//calculateBill();
		$http.get("/isUserLoggedIn").
		then(function(response) {
			console.log("response",response);
			if(response.status==200){
				//vm.bookProperty();
				goToCheckoutPage();
			}
			else if(response.status==401){
				
			}
		},function(err) {
			console.log("err",err);
			openLoginModal();
		})
	}
	if($stateParams.property!=null)
		getPropertyDetails($stateParams.property);
	/*else
		vm.property = bookingDataService.getBooking().property;*/
	/*console.log($stateParams);*/

	

}

app.controller('AuctionablePropertyDetailsController',auctionablePropertyDetailsControllerFn);