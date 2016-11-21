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

var SearchBillsByMonth = function (req,res){

	console.log("inside Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);


     });

 }


var SearchBillsbyDate = function (req,res){

	console.log("inside bill by Date");

	bill.find({billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);

	})

}


var DeleteBill = function (req,res){

	console.log("inside delete bill");
	
	bill.update({"billing_id":req.body.DeleteBill.billing_id}, {$set : {bill_status : "inactive" }}, function(err, user){
		if (user) 
		{
			res.status(200);
			res.json({"result":"Bill Deleted"});
		} else 
		{
			console.log(err);
		}
	});
}



exports.DeleteBill = DeleteBill;
exports.SearchBillsByMonth = SearchBillsByMonth;
exports.GenerateBill = GenerateBill;
exports.SearchBillsbyDate = SearchBillsbyDate;