var app = angular.module('Airbnb');


function hostAnalyticsControllerFn($state,$scope,$http) {	
	var vm = this;

	//Page clicks for last 10 days
	vm.pageClickOptions = {
		    chart: {
		        type: 'discreteBarChart',
		        height: 400,
		        margin : {
		            top: 20,
		            right: 20,
		            bottom: 60,
		            left: 55
		        },
		        x: function(d){ return d.label; },
		        y: function(d){ return d.value; },
		        showValues: true,
		        valueFormat: function(d){
		            return d3.format()(d);
		        },
		        transitionDuration: 1000,
		        xAxis: {
		            axisLabel: 'X Axis'
		        },
		        yAxis: {
		            axisLabel: 'Y Axis',
		            axisLabelDistance: 30
		        }
		    }
		};
	
	
	vm.pageClickData = function(){

		$http({
			method : "POST",
			url : '/clicksPerPage'
		}).success(function(details) {
			//console.log(details);

				vm.clickData = [{
	    		key: "Cumulative Return",
	    		values: [
				        { "label" : "Login Page" , "value" : details.login_page },
				        { "label" : "Logout Page" , "value" : details.logout_page },
				        { "label" : "Bill Page" , "value" : details.bill_page },
				        { "label" : "Edit Profile Page" , "value" : details.editprofile_page },
				        { "label" : "Become A Host Page" , "value" : details.host_page},
				        { "label" : "Search Property Page" , "value" : details.property_page },
				        { "label" : "Property Details Page" , "value" : details.propertydescription_page },
				        { "label" : "Signup Page" , "value" : details.signup_page },
				        { "label" : "Trip Details Page" , "value" : details.trip_page }
				        ]

	    			}]
	    });
	    
	}

vm.pageClickData();

	//Property clicks/date
	vm.propertyClickOptions = {
		    chart: {
		        type: 'discreteBarChart',
		        height: 400,
		        margin : {
		            top: 20,
		            right: 20,
		            bottom: 60,
		            left: 55
		        },
		        x: function(d){ return d.label; },
		        y: function(d){ return d.value; },
		        showValues: true,
		        valueFormat: function(d){
		            return d3.format()(d);
		        },
		        transitionDuration: 1000,
		        xAxis: {
		            axisLabel: 'Property ID'
		        },
		        yAxis: {
		            axisLabel: 'No. of clicks',
		            axisLabelDistance: 30
		        }
		    }
		};
	

	vm.propertyClickData = function()
	{
		$http({
			method : "POST",
			url : '/propertyClick'
		}).success(function(details) {

			//console.log(details);

			var valueArray = [];

			for(var i = 0 ; i < details.length ; i++)
			{
				valueArray.push({"label" : details[i][0].property_id , "value" : details[i][0].count});
			}

			console.log("valueArray "+valueArray);
			
			vm.propertyData = [{
	    		key: "Cumulative Return",
	    		values: valueArray
	    		}]		

	    });
	}

	vm.propertyClickData();


	vm.config = {
		    visible: true, // default: true
		    extended: false, // default: false
		    disabled: false, // default: false
		    refreshDataOnly: true, // default: true
		    deepWatchOptions: true, // default: true
		    deepWatchData: true, // default: true
		    deepWatchDataDepth: 2, // default: 2
		    debounce: 10 // default: 10
		};

	//Line chart
	$scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Date'
                },
                yAxis: {
                    axisLabel: 'Average Rating',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
        };

   // $scope.data = findRatingsData();

        /*Random Data Generator */
        function findRatingsData() {

        	$http({
			method : "POST",
			url : '/propertyReviews'
			}).success(function(details) {

				console.log("details "+details);
				console.log("details[0] "+details[2]);
				console.log("details[0] "+details[2].reviews);
				console.log("details[0] "+details[2].property_id);
				console.log("details[0] "+details[2].reviews[0].rating);
				console.log("details[0] "+details[2].reviews[0].timestamp);
				console.log("details[0] "+details[2].reviews[1].rating);
				console.log("details[0] "+details[2].reviews[1].timestamp);


				var ratings1 = [];
				var ratings2 = [];
				var ratings = [];
				
            	ratings.push({x: 15, y: 2.9});
                ratings.push({x: 16, y: 3.8});
                ratings.push({x: 18, y: 5});
                ratings.push({x: 19, y: 4.3});
                ratings.push({x: 20, y: 4.1});
                ratings.push({x: 21, y: 3.2});
                ratings.push({x: 22, y: 4.5});
                ratings.push({x: 23, y: 5});
                ratings.push({x: 24, y: 4.3});
                ratings.push({x: 25, y: 4.2});
				

				ratings1.push({x: 15, y: details[2].reviews[0].rating});
                ratings1.push({x: 16, y: details[2].reviews[1].rating});

                ratings2.push({x: 15, y: details[1].reviews[0].rating});


                console.log(details[1].reviews[0].rating);

            	//Line chart data should be sent as an array of series objects.
            	$scope.data =  [
            			/*
                		{
                    		values: ratings1,      //values - represents the array of {x,y} data points
                    		key: 'Average Ratings', //key  - the name of the series.
                    		color: '#ff7f0e'  //color - optional: choose your own line color.
                		},
						*/
                		{
                    		values: ratings,      //values - represents the array of {x,y} data points
                    		key: 'Average Ratings', //key  - the name of the series.
                    		color: '#2ca02c'  //color - optional: choose your own line color.
                		}
            		  ];

			});
        };


        findRatingsData();
	
	
}

app.controller('hostAnalyticsController',hostAnalyticsControllerFn);
