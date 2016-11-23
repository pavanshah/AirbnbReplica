var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Trips = require('../Models/trip');
var Property = require('../Models/property');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');

var globalTripObject ;
var globalProperty;

var getTrips = function (req,res) {
	var userId = req.session.user.emailId;
	query = {"user_id":userId};

	Trips.find(query,function(err, trips){
		if(!err){

			res.status(200);
			res.json(trips);
		}
		else
		{
			console.log("Error in fetching user trips:"+err);
			res.status(400);
			res.json({"response":"Some error occurred"});
			
		}
	});
};

/*					var tripObject = {
						//trip_id : String,
						"property" : {
							"property_id" : billResponse.property.property_id
						},
						"user_id":req.session.user.emailId ,
						"bill" : {
							"billing_id": billResponse.billing_id,
							"trip_amount" : billResponse.trip_amount
						},	
						"trip_start_date" : billResponse.from_date,
						"trip_end_date" : billResponse.to_date	
					};
var Trip = new Schema({
	trip_id : String,
	property : {
		property_id : String,
		propertyTitle : String,
		description : String,
		propertyPictures : [String],
		qty : Number,
		category : String
	},
	host_id : String,
	user_id : String,
	bill : {
		billing_id: String,
		trip_amount : Number
	},	
	trip_start_date : Date,
	trip_end_date : Date			 
});					*/

var createTrip = function (tripObject,callback) {
	console.log("abdhakbbfkhbkhbabfhkabfbahbdkb"+tripObject.body);
	console.log("property_id"+tripObject.property.property_id);
	console.log("user_id"+tripObject.user_id);
	globalTripObject = tripObject;
	query = {"property_id":tripObject.property.property_id};
	Property.find(query, function(err,property){
		if(err)
		{
			callback({"status":400,"result":"Failed to fetch property in Create Trip"});
		}
		else
		{
			console.log("propertyy final"+property);
			globalProperty = property;
			//console.log("ljabfbhea"+tripObject);
			var trip_id = uniqueIDGenerator.returnUniqueID();
			var trip_data = {
				"trip_id" : trip_id,
				"property" : {
					"property_id" : "333",//globalProperty.property_id,
					"propertyTitle" : globalProperty.propertyTitle,
					"description" : globalProperty.description,
					"propertyPictures" : globalProperty.propertyPictures,
					"qty" : globalProperty.qty,
					"category" : globalProperty.category
				},
				"host_id" : globalProperty.host_id,
				"user_id" : globalTripObject.user_id,
				"bill" : {
					"billing_id" : globalTripObject.bill.billing_id,
					"trip_amount" : globalTripObject.bill.trip_amount, 
				},
				"trip_start_date" : globalTripObject.trip_start_date,
				"trip_end_date" : globalTripObject.trip_end_date 
			};

			var finalTripObject = Trips(trip_data);
			console.log(finalTripObject);
			finalTripObject.save(function(err, result){
				if(err)
				{
					callback({"status":400,"result":"Failed to fetch property in Create Trip"});
				}
				else
				{
					callback({"status":200,"result":"Trip Created","trip_details":result});
				}
			});
		}
	});


}



exports.getTrips = getTrips;
exports.createTrip = createTrip;