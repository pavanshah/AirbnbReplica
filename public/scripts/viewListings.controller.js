var app = angular.module('Airbnb');

function viewListingsControllerFn($state,propertyService,locationService) {
	
	var vm = this;

	vm.viewPropertyDetails = function() {
		$state.go("propertyDetails");
	}
  var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  var mapCenter = {};
  var properties = [];

  

  function drawMarkersOnMap(properties){
      locationService.initMap(mapCenter);
      var locations = locationService.convertToMapPoints(properties);
      console.log("converted locations",locations)
      locationService.drawMarkersOnMap(locations,icon);
  }

  function getProperties(filter) {
     propertyService.getProperties({}).
      then(function(properties) {
          properties = properties;
          mapCenter = {lat: properties[0].location[1], lng: properties[0].location[0]};
          drawMarkersOnMap(properties); 
      });
  }

  getProperties(); 

 }

app.controller('ViewListingsController',viewListingsControllerFn);