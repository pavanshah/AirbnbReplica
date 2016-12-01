var app = angular.module('Airbnb');


function hostAnalyticsControllerFn($state,$scope,$http) {	
	var vm = this;


	vm.donutOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 300,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: true,

	                
	                duration: 100,
	                legend: {
	                    margin: {
	                        top: 5,
	                        right: 140,
	                        bottom: 5,
	                        left: 0
	                    }
	                }
	            }
	        };


	 vm.donutData = function(){
	 	/*
	 	$http({
			method : "POST",
			url : '/clicksPerPage'
		}).success(function(details) {
			//console.log(details);

				vm.donutData = [{
	    		
				        { key : "Login Page" , y : details.login_page },
				        { key : "Logout Page" , y : details.logout_page },
				        { key : "Bill Page" , y : details.bill_page },
				        { key : "Edit Profile Page" , y : details.editprofile_page },
				        { key : "Become A Host Page" , y: details.host_page},
				        { key : "Search Property Page" , y : details.property_page },
				        { key : "Property Details Page" , "value" : details.propertydescription_page },
				        { key : "Signup Page" , "value" : details.signup_page },
				        { key : "Trip Details Page" , "value" : details.trip_page }

	    			}]
	    });
		*/

	 }
	 
	 vm.donutData = [
	                {
	                    key: "Users",
	                    y: 100
	                },
	                {
	                    key: "Hosts",
	                    y: 26
	                }
	                ];



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
                        return d3.format()(d);
                    },
                    axisLabelDistance: 10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
        };

        function findRatingsData() {

        	$http({
			method : "POST",
			url : '/propertyReviews'
			}).success(function(details) {



				/*
				var array = [];
				var array1 = [];

				console.log(details.length);

			
				for(var i = 0 ; i < details.length ; i++)
				{
					for(var j = 0 ; j < details[i].reviews.length ; j++)
					{
						array.push({x: details[i].reviews[j].timestamp, y: parseInt(details[i].reviews[j].rating)});
					}

					array1.push({values : array, key : details[i].property_id, color : '#ff7f0e'});
					//array = [];
				}


				console.log(array1);
				*/



				/*
				console.log("details "+details);
				console.log("details[0] "+details[2]);
				console.log("details[0] "+details[2].reviews);
				console.log("details[0] "+details[2].property_id);
				console.log("details[0] "+details[2].reviews[0].rating);
				console.log("details[0] "+details[2].reviews[0].timestamp);
				console.log("details[0] "+details[2].reviews[1].rating);
				console.log("details[0] "+details[2].reviews[1].timestamp);
				*/

						var sin = [],sin2 = [],
		                cos = [];

		            //Data is represented as an array of {x,y} pairs.
		            for (var i = 0; i < 100; i++) {
		                sin.push({x: i, y: Math.sin(i/10)});
		                sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
		                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
		            }

				var ratings1 = [];
				var ratings2 = [];

				ratings1.push({x: 15, y: parseInt(details[2].reviews[0].rating)});
                ratings1.push({x: 16, y: parseInt(details[2].reviews[1].rating)});

                ratings2.push({x: 15, y: parseInt(details[1].reviews[0].rating)});
                ratings2.push({x: 16, y: 5});
                ratings2.push({x: 17, y: 3.5});


                //console.log("timestamp "+parseInt(details[2].reviews[0].timestamp));
                //console.log("timestamp "+parseInt(details[2].reviews[0].timestamp));

                console.log(details[2].reviews[0].timestamp);
                var date = new Date(details[2].reviews[0].timestamp);
                console.log(date);
                console.log(date.getDate());


            	//Line chart data should be sent as an array of series objects.
            	$scope.data =  [
            			
                		{
                    		values: ratings2,      //values - represents the array of {x,y} data points
                    		key: 'Sine Wave', //key  - the name of the series.
                    		color: '#ff7f0e'  //color - optional: choose your own line color.
                		},
						
                		{
                    		values: ratings1,
                   			 key: 'Cosine Wave',
                    		color: '#2ca02c'
                		}
            		  ];

			});
        };


        findRatingsData();

}

app.controller('hostAnalyticsController',hostAnalyticsControllerFn);
