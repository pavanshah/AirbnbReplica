var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('../Models/property');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');



var CreateProperty = function (req,res){

	console.log("inside create property");

	/*
	var todayDate = new Date();
	var year = todayDate.getFullYear();
	var month = parseInt(todayDate.getMonth())+1;
	var date = todayDate.getDate();
	var hour = todayDate.getHours();
	var minute = todayDate.getMinutes();
	var second = todayDate.getSeconds();
	var milliSecond = todayDate.getMilliseconds();
	var property_id = year+""+month+""+date+""+hour+""+minute+""+second+""+milliSecond;
	//Will use the below variable to save the propertyID after the login is done and username is available in the session
	//var property_id = req.session.username+""+year+""+month+""+date+""+hour+""+minute+""+second+""+milliSecond;
	*/
	
	req.body.property.property_id = uniqueIDGenerator.returnUniqueID();
	
	
	var newProperty = Property(req.body.property);
	console.log(newProperty);
	newProperty.save(function(err,result){

		if(!err){
			console.log(result);
			res.status(200);
			res.json({"result":"Property created"});

		}
		else
			console.log(err);
	});


}


var SearchPropertyByDistance = function(req,res){

	var lat             = req.body.latitude;
    var long            = req.body.longitude;
    //var distance        = req.body.distance;


    var distance = 100;
    //lat = 42;
    //long = -122;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = Property.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});
    }
    
    // ... Other queries will go here ... 

    // Execute Query and Return the Query Results
    query.exec(function(err, properties){
        if(err)
            res.send(err);

        // If no errors, respond with a JSON of all users that meet the criteria
        res.json(properties);
    });

/*	//var retrivedProperty = mongoose.model('Property',Property);

	Property.findOne({"property_id":"1234"},function(err,property){

		if(!err){

			res.status(200);
			res.json(property);
		}
		else
		{
			console.log(err)
		}

	})

*/
}

var FilterProperties = function(req,res){


	Property.find({},function(err,properties){

		if(!err){

			res.status(200);
			res.json(properties);
		}
		else
		{
			console.log(err)
		}


	})

}

var UpdateProperty = function(req,res){
	console.log("inside update property");
	var query = {'property_id':req.body.property.property_id};
	var obj = req.body.property;
	Property.update(query,{$set:obj}, function(error, property) {
		if(!error)
		{
			res.status(200);
			res.json({"result":"Property updated"});
		}
		else{
			console.log(error);
		}
		
	});
}

exports.SearchPropertyByDistance = SearchPropertyByDistance;
exports.CreateProperty = CreateProperty;
exports.FilterProperties = FilterProperties;
exports.UpdateProperty = UpdateProperty;