var app = angular.module('Airbnb');

function viewListingsControllerFn($state,propertyService,locationService,$stateParams) {
	
	var vm = this;

	vm.viewPropertyDetails = function(property) {
		$state.go("propertyDetails",{property_id:property.property_id});
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
            mapCenter = {lat: vm.properties[1].location[1], lng: vm.properties[1].location[0]};
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