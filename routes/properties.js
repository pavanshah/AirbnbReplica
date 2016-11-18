var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('../Models/property');



var CreateProperty = function (req,res){

	console.log("inside create property");
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

	//var retrivedProperty = mongoose.model('Property',Property);

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
	var newProperty = Property(req.body.property);
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

exports.SearchPropertyByDistance = SearchPropertyByDistance;
exports.CreateProperty = CreateProperty;
exports.FilterProperties = FilterProperties;