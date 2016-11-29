var app = angular.module('Airbnb');


function hostProfilePhotoAndVideoFn($state,$scope,$http) {
	var vm = this;
	vm.populateHostProfile = function() {
		
		$http.get('/getHostDetails').then(function(response){
	    console.log(response.data.user);
			
			vm.host=response.data.user;
			if(vm.host.profilepic==undefined||vm.host.profilepic==null){
				console.log("setting default image");
				vm.host.profilepic="/public/images/generic-profile.png"
			}

		});
		
		vm.updateProfilePic = function(){

			filepicker.pick(
			  {
			    mimetype: 'image/*',
			    container: 'modal',
			    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
			  },
			  function(Blob){
				console.log("got the image");
			    console.log(JSON.stringify(Blob.url));
			    vm.host.profilepic=Blob.url;
			    console.log(vm.host.profilepic);
			    vm.UpdateProfile();
			  },
			  function(FPError){
			    console.log(FPError.toString());
			  });

		}
		vm.UpdateProfile = function() {

			console.log("calling updateProfile");
			$http.post('/updateHost',{"user":vm.host}).then(function(response){

				console.log(response.data);
				
				vm.showAlert=true;

			})
		}
	}
	
	vm.updateHostVideo = function(){
		filepicker.pick(
				  {
				    mimetype: 'image/*',
				    container: 'modal',
				    services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'GOOGLE_DRIVE', 'DROPBOX']
				  },
				  function(Blob){
					console.log("got the image");
				    console.log(JSON.stringify(Blob.url));
				    //vm.host.profilepic=Blob.url;
				    //console.log(vm.host.profilepic);
				    //vm.UpdateProfile();
				  },
				  function(FPError){
				    console.log(FPError.toString());
				  });
	}
		
	vm.populateHostProfile();
}

app.controller('hostProfilePhotoAndVideo',hostProfilePhotoAndVideoFn);
