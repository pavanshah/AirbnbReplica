var app = angular.module('Airbnb');


function hostAnalyticsControllerFn($state,$scope,$http) {	
	var vm = this;

	//Property clicks/date
	$scope.barOptions = {
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
	
	
	$scope.barData = [{
	    key: "Cumulative Return",
	    values: [
	    	{ "label" : "15/11/16" , "value" : 33 },
	    	{ "label" : "16/11/16" , "value" : 15 },
	    	{ "label" : "17/11/16" , "value" : 27 },
	        { "label" : "18/11/16" , "value" : 49 },
	        { "label" : "19/11/16" , "value" : 32 },
	        { "label" : "20/11/16" , "value" : 40 },
	        { "label" : "21/11/16" , "value" : 19 },
	        { "label" : "22/11/16" , "value" : 70 },
	        { "label" : "23/11/16" , "value" : 67 },
	        { "label" : "24/11/16" , "value" : 32 }
	        ]
	    }]

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

        $scope.data = findRatingsData();

        /*Random Data Generator */
        function findRatingsData() {
            var ratings = [];

            	ratings.push({x: 16, y: 2.9});
                ratings.push({x: 15, y: 3.8});
                ratings.push({x: 18, y: 5});
                ratings.push({x: 19, y: 4.3});
                ratings.push({x: 20, y: 4.1});
                ratings.push({x: 21, y: 3.2});
                ratings.push({x: 22, y: 4.5});
                ratings.push({x: 23, y: 5});
                ratings.push({x: 24, y: 4.3});
                ratings.push({x: 25, y: 4.2});

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: ratings,      //values - represents the array of {x,y} data points
                    key: 'Average Ratings', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                }
            ];
        };
	
	
}

app.controller('hostAnalyticsController',hostAnalyticsControllerFn);
