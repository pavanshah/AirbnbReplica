var app = angular.module('Airbnb');


function HostCardDetails($state,$scope,$http) {	
	var vm = this;
	$scope.cardNumber='';
	$scope.expiryDate='';
	$scope.cvv=''
	$scope.saveCardDetails = function(){
		console.log($scope.cardNumber);
		console.log($scope.expiryDate);
		console.log($scope.cvv);
		$http.post('/updateHost',{"from":"card","cardNumber":$scope.cardNumber,
			"expiryDate":$scope.expiryDate,"cvv":$scope.cvv
			}).then(function(response){
				console.log(response.data);
			})
	};
	
		
}

app.controller('hostCardDetails',HostCardDetails);
