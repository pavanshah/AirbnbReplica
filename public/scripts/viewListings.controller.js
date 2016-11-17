var app = angular.module('Airbnb');

function viewListingsControllerFn($state) {
	
	var vm = this;

	vm.viewPropertyDetails = function() {
		$state.go("propertyDetails");
	}


	 var Location = function(latlon, message, username, gender, age, favlang){
            this.latlon = latlon;
            this.message = "Hey";
         
        };

	var sampleData = [
		{
			location:[-122.109245,42.944611]
		},{
			location:[-120,40]
		}
	]



	var convertToMapPoints = function(response){

            // Clear the locations holder
            var locations = [];

            // Loop through all of the JSON entries provided in the response
            for(var i= 0; i < response.length; i++) {
                var user = response[i];

                // Create popup windows for each record
                var  contentString = "Hi I am a marker!";
                // Converts each of the JSON records into Google Maps Location format (Note Lat, Lng format).
                locations.push(new Location(
                    new google.maps.LatLng(user.location[1], user.location[0]),
                    new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    })
                ));
            }
            // location is now an array populated with records in Google Maps format
            return locations;
        };

	var myLatLng = {lat: 32.23, lng: 30.20};

    // If map has not been created already...
    if (!map){

        // Create a new map and place in the index.html page
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            center: myLatLng
        });
    }

    var icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

    var myLocations = convertToMapPoints(sampleData);
    console.log("myLocations",myLocations);

    angular.forEach(myLocations,function(property) {

    	 var marker = new google.maps.Marker({
                   position: property.latlon,
                   map: map,
                   title: "Big Map",
                   icon: icon,
               });

  // For each marker created, add a listener that checks for clicks
        google.maps.event.addListener(marker, 'click', function(e){

            // When clicked, open the selected marker's message
            currentSelectedMarker = property;
            property.message.open(map, marker);
        });
    })

/*    locations.forEach(function(n, i){
               var marker = new google.maps.Marker({
                   position: n.latlon,
                   map: map,
                   title: "Big Map",
                   icon: icon,
               });

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e){

                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });
*/
}

app.controller('ViewListingsController',viewListingsControllerFn);