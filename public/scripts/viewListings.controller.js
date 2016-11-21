var app = angular.module('Airbnb');

function viewListingsControllerFn($state,propertyService,locationService) {
	
	var vm = this;

	vm.viewPropertyDetails = function() {
		$state.go("propertyDetails");
	}
  var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  var mapCenter = {};
  vm.properties = [];

  

  function drawMarkersOnMap(properties){
      locationService.initMap(mapCenter);
      var locations = locationService.convertToMapPoints(properties);
      console.log("converted locations",locations)
      locationService.drawMarkersOnMap(locations,icon);
  }

  function getProperties(filter) {
     propertyService.getProperties({}).
      then(function(properties) {
          vm.properties = properties;
          angular.forEach(properties,function(property) {
            if(!property.propertyPictures || property.propertyPictures.length==0){
              property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
            }
          })
          mapCenter = {lat: vm.properties[1].location[1], lng: vm.properties[1].location[0]};
          drawMarkersOnMap(vm.properties); 
      });
  }

  getProperties(); 

 }

app.controller('ViewListingsController',viewListingsControllerFn);