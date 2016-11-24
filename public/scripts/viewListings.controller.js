var app = angular.module('Airbnb');

function viewListingsControllerFn($state,propertyService,locationService,$stateParams,bookingDataService) {
	
	var vm = this;

	vm.viewPropertyDetails = function(property) {
    bookingDataService.setBooking(property);
		$state.go("propertyDetails",{property:property});
	}
  var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  var mapCenter = {};
  vm.properties = [];
  var filterdProperties = [];
  vm.filters = $stateParams.filters;
  console.log("stateParams",vm.filters);
  
  function drawMarkersOnMap(properties){
      locationService.initMap(mapCenter);
      var locations = locationService.convertToMapPoints(properties);
      console.log("converted locations",locations)
      locationService.drawMarkersOnMap(locations,icon);
  }



  function getProperties(filters) {
     propertyService.getProperties(filters).
      then(function(properties) {
          vm.properties = properties;
          //filter(properties);
          if(vm.properties.length!=0){
              angular.forEach(properties,function(property) {
              if(!property.propertyPictures || property.propertyPictures.length==0){
                property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              }
            })
            mapCenter = {lat: vm.properties[0].location[1], lng: vm.properties[0].location[0]};
            drawMarkersOnMap(vm.properties); 
          }
          else{
            mapCenter = {lat: 39, lng: -122};
            locationService.initMap(mapCenter);
          }
          
      });
  }

  getProperties(vm.filters); 

 }

app.controller('ViewListingsController',viewListingsControllerFn);