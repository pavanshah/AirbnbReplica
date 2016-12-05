var app = angular.module('Airbnb');


function HostProfileFn($state,$scope,$http,$mdDialog) {	
	var vm = this;
	console.log("inside this controller");
	var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
	
	vm.checkPhone = function(){
		if(regexp.test(vm.host.phone) || regexp.test(vm.host.phone))
		{
			console.log("valid");
			vm.invalidPhone = false;
		}
		else
		{
			vm.invalidPhone = true;
		}
	}
	
	
	
	vm.getHostDetails =  function() {
		console.log("geting host details");
		$http.get('/getHostDetails').then(function(response){
			console.log(response.data);
			if(response.status == 200){
				vm.host = response.data.user;
				vm.host.address = response.data.user.address;
			}
		});
	}
	
	vm.getHostDetails();
	
				
	
	vm.photoSymbolVideo = function(){
		window.location.assign("#/hostProfilePhotoAndVideo");
	}
	$scope.save = function(){

		var descriptionRegex = /^[a-zA-Z0-9&!',.\_\- ]*$/;
		var invalidStreetFlag = false;
		console.log("save button clicked");


		if(!descriptionRegex.test(vm.host.address.street))
		{
			console.log("inside regex");
			invalidStreetFlag = true;
		}
		else
		{

			console.log("calling updateProfile");
			console.log(vm.host);
			$http.post('/updateHost',{"user":vm.host}).then(function(response){

			console.log(response.data);
			
			var confirm = $mdDialog.confirm()
            .title('Successfully Updated Your Details!')
            .textContent("Lets go back to the home")
            .ariaLabel('Created!')
            .ok('Ok');
            
            $mdDialog.show(confirm).then(function() {
               console.log("Do u think it ll work");
               window.location.assign("#/hostHomePage");
               }, function() {
              	 console.log("it worked");
            });

		})

		}
		
		
		
	}
	
	
	
}
	
	
		


app.controller('hostProfile',HostProfileFn);
