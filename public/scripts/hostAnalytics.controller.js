var app = angular.module('Airbnb');


function hostAnalyticsControllerFn($state,$scope,$http) {	
	var vm = this;


	vm.donutOptions = {
	            chart: {
	                type: 'pieChart',
	                height: 400,
	                donut: true,
	                x: function(d){return d.key;},
	                y: function(d){return d.y;},
	                showLabels: true,

	                
	                duration: 100,
	                legend: {
	                    margin: {
	                        top: 0,
	                        right: 0,
	                        bottom: 0,
	                        left: 0
	                    }
	                }
	            }
	        };


	 vm.donutDataFunction = function(){
	 	
	 	$http({
			method : "POST",
			url : '/clicksPerPage'
		}).success(function(details) {
			//console.log(details);

				vm.donutData = [
	    		
				        { key : "Login Page" , y : details.login_page },
				        { key : "Logout Page" , y : details.logout_page },
				        { key : "Bill Page" , y : details.bill_page },
				        { key : "Profile Page" , y : details.editprofile_page },
				        { key : "Host Page" , y: details.host_page},
				        { key : "Search Property" , y : details.property_page },
				        { key : "Property Details" , "value" : details.propertydescription_page },
				        { key : "Signup Page" , "value" : details.signup_page },
				        { key : "Trip Page" , "value" : details.trip_page }

	    			];
	    });

	 }


	  vm.donutDataFunction();

	//Page clicks for last 10 days
	vm.pageClickOptions = {
		    chart: {
		        type: 'discreteBarChart',
		        height: 400,
		        margin : {
		            top: 20,
		            right: 0,
		            bottom: 60,
		            left: 0
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
				        { "label" : "Profile Page" , "value" : details.editprofile_page },
				        { "label" : "Host Page" , "value" : details.host_page},
				        { "label" : "Search Property" , "value" : details.property_page },
				        { "label" : "Property Details" , "value" : details.propertydescription_page },
				        { "label" : "Signup Page" , "value" : details.signup_page },
				        { "label" : "Trip Page" , "value" : details.trip_page }
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

			console.log(details);
			var maxReviews;

			for(var i = 0 ; i < details.length ; i++)
			{
				console.log("review length "+details[i].reviews.length);

				if(details.length == 1)
				{
					maxReviews = i;
				}

				else if(i < (details.length-1))
				{
					if(details[i].reviews.length < details[i+1].reviews.length)
					{
						maxReviews = i+1;
						console.log("max size "+maxReviews);
					}
				}
			}


			var displayObj = details[maxReviews];
			var avg;

			
			var displayArray = [];

			for(var i = 0 ; i < displayObj.reviews.length ; i++)
			{
				var date = new Date(displayObj.reviews[i].timestamp);
				displayArray.push({x : i , y : displayObj.reviews[i].rating});
				console.log(date);
				console.log(displayObj.reviews[i].rating);
			}
			

            	$scope.data =  [
            			/*
                		{
                    		values: sin,      //values - represents the array of {x,y} data points
                    		key: 'Sine Wave', //key  - the name of the series.
                    		color: '#ff7f0e'  //color - optional: choose your own line color.
                		},
						*/
                		{
                    		values: displayArray,
                   			 key: displayObj.property_id,
                    		color: '#2ca02c'
                		}
            		  ];

			});
        };


        findRatingsData();



        function findUserTraceData() {

        	$http({
			method : "POST",
			url : '/userTracking'
			}).success(function(details) {

			console.log("User trace "+details);
			

				/*
            	$scope.data =  [
            			/*
                		{
                    		values: sin,      //values - represents the array of {x,y} data points
                    		key: 'Sine Wave', //key  - the name of the series.
                    		color: '#ff7f0e'  //color - optional: choose your own line color.
                		},
						
                		{
                    		values: displayArray,
                   			 key: displayObj.property_id,
                    		color: '#2ca02c'
                		}
            		  ];	
				*/

			});
        };


        findUserTraceData();



}

app.controller('hostAnalyticsController',hostAnalyticsControllerFn);
