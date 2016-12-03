var app = angular.module('Airbnb');


function hostProfilePhotoAndVideoFn($state,$scope,$http) {
	var vm = this;
	vm.test = "new";
	
	
	vm.populateHostProfile = function() {
		
		$http.get('/getHostDetails').then(function(response){
	    console.log(response.data.user);
			
			vm.host=response.data.user;
			
			vm.host.video = "https://youtu.be/u4KhCg7Oj3o";
			/*
			if(vm.host.video==undefined||vm.host.video==null){
				
				console.log("setting default image");
				$scope.video = true;
				
			} else {
				
				$scope.video = false;
				vm.host.video = vm.host.video;
				
			}*/
			
			if(vm.host.profilepic==undefined||vm.host.profilepic==null){
				console.log("setting default image");
				vm.host.profilepic="/public/images/generic-profile.png"
			} else {
				vm.host.profilepic = vm.host.profilepic;
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
	
	vm.uploadVideos = function() {
		
		filepicker.pickMultiple(
			{mimetype: 'video/*',
			container: 'modal',
			services: ['COMPUTER']},
			
			  function(Blob){
			    console.log(JSON.stringify(Blob));
			    //for(i=0;i<Blob.length;i++){
			    	//vm.host.video = Blob[0].url;
			    	
			    	console.log("before");
			    	//console.log(vm.test);
			    	
			    	
			    //}
			    	console.log("after");
			    	console.log(vm.test);
			    	$scope.$apply(function () {
			    		$scope.newtest = Blob[0].url;
			    		
			        });
			    	
			    	console.log("yashasas");
			    console.log(vm.host.video);
			  },
			  function(FPError){
			    console.log(FPError.toString());
			  });

	}
	
		
	vm.populateHostProfile();
}

app.controller('hostProfilePhotoAndVideo',hostProfilePhotoAndVideoFn);
