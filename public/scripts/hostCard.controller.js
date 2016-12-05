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
	
	$scope.$on('$viewContentLoaded', function() {
		//$scope.getHostDetails = function(){
			
			
			console.log("geting host card details");
			$http.get('/getHostDetails').then(function(response){
				console.log(response);
				if(response.status == 200){
					console.log($scope.cardNumber);
					console.log($scope.expiryDate);
					console.log($scope.cvv);
					var expiryDate =response.data.user.card.expiryyear +"/"+ response.data.user.card.expirymonth;
					console.log(expiryDate);
					$scope.cardNumber = response.data.user.card.creditcard;
					$scope.expiryDate = expiryDate;
					$scope.cvv = response.data.user.card.cvv;
				}
				
		});
		});
	
		
}

app.controller('hostCardDetails',HostCardDetails);
