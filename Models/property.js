var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Property = new Schema({
 property_id: String,
 host_id: String,
 category:String,
 qty:Number,
 base_price:Number,
 location: {
 				type:[Number],
 				required:true
 				
 			},
address : {
	street: String,
	state: String,
	city:String,
	zipcode:String,
	country:String
			 },

 description:String,
 bookings:[{
 			start_date:Date,
 			end_date:Date
 		}],
 property_start_date:Date,
 property_end_date:Date,
princing_catalog : {

	weekend_surge:Number,
	seasonal_surge:Number,
	weekly_discount:Number,
	monthly_discount:Number
					 }
});
Property.index({location: '2dsphere'});
module.exports = mongoose.model("Property",Property);