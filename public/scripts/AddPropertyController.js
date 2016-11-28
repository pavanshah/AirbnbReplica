var app = angular.module('Airbnb');


function AddPropertyControllerFn($state,$stateParams,$http) {
	
	var vm = this;
	vm.property = {
		address:{
			"street":"",
		"city":"",
		"state":"",
		"zipcode":"",
		"country":"",
		"formatted":""},
		location:[],
		propertyPictures:[],
		propertyVideos:[],
		ListingType:""
	};
	vm.location=[];
	vm.showPricingCatalog=true;
	vm.showBaseNote=false;
	//vm.ListingType = "";
	
	vm.UploadProperty = function()
	{
		vm.invalidTitleFlag = false;
		vm.invalidDescriptionFlag = false;
		vm.requiredTitleFlag = false;
		vm.requiredDescriptionFlag = false;
		vm.invalidStartDateFlag = false;
		vm.requiredCatagoryFlag = false;
		vm.invalidEndDateFlag = false;
		vm.requiredTypeFlag = false;
		vm.requiredAddressFlag = false;
		vm.requiredBaseFlag = false;
		vm.requiredBaseFlag = false;
		vm.requiredWSurgeFlag = false;
		vm.requiredHSurgeFlag = false;
		vm.requiredWeeklyDisc = false;
		vm.requiredMonthlyDisc = false;
		vm.invalidBasePrice = false;
		var titleRegex = /^[a-zA-Z\_\- ]*$/;
		var descriptionRegex = /^[a-zA-Z0-9\_\- ]*$/;
		var numberRegex = /^[0-9]*$/;
		var start_date = new Date(vm.property.property_start_date);
		var end_date = new Date(vm.property.property_end_date);
		var date = new Date();


		if(!numberRegex.test(vm.property.base_price) || vm.holiday_surge == null || vm.weekend_surge == null || vm.property.base_price == null || vm.travelLocation == null || vm.property.ListingType == "" || vm.property.category == null || end_date<start_date || !titleRegex.test(vm.property.propertyTitle) || !descriptionRegex.test(vm.property.description) || vm.property.propertyTitle == null || vm.property.description == null || date>start_date)
		{
			if(!numberRegex.test(vm.property.base_price))
			{
				vm.invalidBasePrice = true;
			}

			if(vm.weekly_discount == null)
			{
				vm.requiredWeeklyDisc = true;
			}

			if(vm.monthly_discount == null)
			{
				vm.requiredMonthlyDisc = true;
			}

			if(vm.holiday_surge == null)
			{
				vm.requiredHSurgeFlag = true;
			}

			if(vm.weekend_surge == null)
			{
				vm.requiredWSurgeFlag = true;
			}

			if(vm.property.base_price == null)
			{
				vm.requiredBaseFlag = true;
			}

			if(vm.travelLocation == null)
			{
				vm.requiredAddressFlag = true;
			}

			if(vm.property.ListingType == "")
			{
				vm.requiredTypeFlag = true;
			}

			if(vm.property.category == null)
			{
				vm.requiredCatagoryFlag = true;
			}

			if(!titleRegex.test(vm.property.propertyTitle))
			{
				vm.invalidTitleFlag = true;
			}

			if(vm.property.propertyTitle == null)
			{
				vm.requiredTitleFlag = true;
			}

			if(!descriptionRegex.test(vm.property.description))
			{
				vm.invalidDescriptionFlag = true;
			}

			if(vm.property.description == null)
			{
				vm.requiredDescriptionFlag = true;
			}

			if(date>start_date)
			{
				vm.invalidStartDateFlag = true;
			}

			if(end_date<start_date)
			{
				vm.invalidEndDateFlag = true;
			}
		}
		else
		{

				console.log("inside");
				if(angular.isUndefined(vm.travelLocation) || vm.travelLocation== null){
				return;
				}
				//vm.property = property;
				console.log(vm.property);

				$http.post('/CreateProperty',{"property":vm.property}).then(function(response){
				console.log(response);
			})
		}
	}
	vm.uploadPhotos = function() {

		filepicker.pickMultiple(
			  {
			    mimetype: 'image/*',
			    container: 'modal',
			    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
			  },
			  function(Blob){
			    console.log(JSON.stringify(Blob));
			    for(i=0;i<Blob.length;i++){

			    	vm.property.propertyPictures[i] = Blob[i].url;
			    }
			  },
			  function(FPError){
			    console.log(FPError.toString());
			  });


	}

	vm.uploadVideos = function() {

		filepicker.pickMultiple(
			{mimetype: 'video/*',
			container: 'modal',
			services: ['COMPUTER']},
			
			  function(Blob){
			    console.log(JSON.stringify(Blob));
			    for(i=0;i<Blob.length;i++){

			    	vm.property.propertyVideos[i] = Blob[i].url;
			    }
			  },
			  function(FPError){
			    console.log(FPError.toString());
			  });

	}

	vm.PopulateAddressFields = function(){

		console.log("populating fields");
		console.log(vm.travelLocation);

		vm.property.address={
			"street":"",
		"city":"",
		"state":"",
		"zipcode":"",
		"country":"",
		"formatted":""};

		for(var i=0;i<vm.travelLocation.address_components.length;i++)
		{
			switch(vm.travelLocation.address_components[i].types[0])
			{
				case "street_number":
				vm.property.address.street+=vm.travelLocation.address_components[i].long_name;

				break;
				case "route":
				vm.property.address.street+=", "+vm.travelLocation.address_components[i].long_name;
				break;
				case "locality":
				vm.property.address.city+=vm.travelLocation.address_components[i].long_name;
				break;
				case "administrative_area_level_1":
				vm.property.address.state+=vm.travelLocation.address_components[i].long_name;
				break;
				case "postal_code":
				vm.property.address.zipcode+=vm.travelLocation.address_components[i].long_name;
				break;
				case "country":
				vm.property.address.country+=vm.travelLocation.address_components[i].short_name;
				break;

			}
		}

		vm.property.address.formatted = vm.travelLocation.formatted_address;
		vm.property.location= [vm.travelLocation.geometry.location.lng(),vm.travelLocation.geometry.location.lat()];

		console.log(vm.property.location[0]);
	}

	vm.UpdateListingType = function () {

		console.log(vm.property.ListingType);

		if(vm.property.ListingType=="auction")
		{
			vm.showPricingCatalog=false;
			vm.showBaseNote = true;
		}



	}


	// vm.uploadFile = uploadFile;
}



app.controller('AddPropertyController',AddPropertyControllerFn);

function uploadFile(){

 		response = event.fpfile.url;
 		console.log(response); //Example Response = https://cdn.filestackcontent.com/tgs6q0d2Qy4Hm35WcYqA

       //Set the respone as Scope.URL and call the POST method using Angular
       	


 	//alert(response);
};