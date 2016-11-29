var app = angular.module('Airbnb');

function viewListingsControllerFn($state,propertyService,locationService,$stateParams,bookingDataService,$scope) {
	
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
  vm.booking = bookingDataService.getBooking();
  function drawMarkersOnMap(properties){
      locationService.initMap(mapCenter);
      var locations = locationService.convertToMapPoints(properties);
      console.log("converted locations",locations)
      locationService.drawMarkersOnMap(locations,icon);
  }

  //price range code.

  function filterPropertiesByRange(sliderId, modelValue, highValue, pointerType) {
      console.log(sliderId, modelValue, highValue, pointerType);

      vm.properties =  _.filter(vm.storedProperties,function(property) {
          return property.base_price >= modelValue && property.base_price <= highValue;
      });
  }



  function setRangeSliderLimits() {
      var maxPrice = _.max(vm.properties,function(val) {
        return val.base_price;
      });

      var minPrice =  _.min(vm.properties,function(val) {
        return val.base_price;
      });

       $scope.slider = {
          min: minPrice.base_price,
          max: maxPrice.base_price,
          options: {
            floor: minPrice.base_price,
            ceil: maxPrice.base_price,
            translate: function(value) {
                       return '$' + value;
                      },
            onChange:filterPropertiesByRange
          },

        };

 
  }


  function getProperties(filters) {
     propertyService.getProperties(filters).
      then(function(properties) {
          vm.properties = properties;
          vm.storedProperties = properties;
          //filter(properties);
          if(vm.properties.length!=0){
              angular.forEach(properties,function(property) {
              if(!property.propertyPictures || property.propertyPictures.length==0){
                property.propertyPictures = ["public/images/room-list-images/room-1-a.png"];
              }
            })
            mapCenter = {lat: vm.properties[0].location[1], lng: vm.properties[0].location[0]};
            drawMarkersOnMap(vm.properties); 

            //find highest and lowest price
            setRangeSliderLimits();
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