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
		var titleRegex = /^[a-zA-Z\_\ ]*$/;
		vm.invalidStreetFlag = false;
		vm.invalidCityFlag = false;
		vm.invalidStateFlag = false;
		vm.invalidZipFlag = false;
		vm.invalidCountryFlag = false;
		var zipRegex1 = /^[0-9]{5}$/;
		var zipRegex2 = /^[0-9]{9}$/;
		var zipFlag = false;
		console.log("save button clicked");

		console.log("street "+vm.host.address.street);
		console.log("Zip "+vm.host.address.zipcode);

		if(zipRegex2.test(vm.host.address.zipcode) || zipRegex1.test(vm.host.address.zipcode))
		{
			console.log("inside zip")
				zipFlag = true;
		}


		if(zipFlag == false || !descriptionRegex.test(vm.host.address.street) || !titleRegex.test(vm.host.address.city) || !titleRegex.test(vm.host.address.state) || !titleRegex.test(vm.host.address.country))
		{
			if(zipFlag == false)
			{
				vm.invalidZipFlag = true;
			}

			if(!descriptionRegex.test(vm.host.address.street))
			{
				vm.invalidStreetFlag = true;
			}

			if(!titleRegex.test(vm.host.address.city))
			{
				vm.invalidCityFlag = true;
			}

			if(!titleRegex.test(vm.host.address.state))
			{
				vm.invalidStateFlag = true;
			}


			if(!titleRegex.test(vm.host.address.country))
			{
				vm.invalidCountryFlag = true;
			}
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
