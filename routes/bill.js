var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bill = require('../Models/bill');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');

var GenerateBill = function (req,res){

	console.log("inside generate bill");
	
	req.body.bill.billing_id = uniqueIDGenerator.returnUniqueID();
	console.log("ID generated");
	
	var newBill = bill(req.body.bill);
	console.log(newBill);
	newBill.save(function(err,result){

		if(!err){
			console.log(result);
			res.status(200);
			res.json({"result":"Bill Generated"});
		}
		else
			console.log(err);
	});
	
}

exports.GenerateBill = GenerateBill;