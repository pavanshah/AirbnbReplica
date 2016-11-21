var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bill = new Schema({

billing_id: String,
billing_date:Date,
from_date:Date,
to_date:Date,
property : Object,
user : Object,

trip_amount:Number

});

module.exports = mongoose.model("bill",bill);