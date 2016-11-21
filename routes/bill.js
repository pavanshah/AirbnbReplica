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

     bill.find({bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchBillsbyDate = function (req,res){

	console.log("inside bill by Date");

	bill.find({bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}

var SearchHostBillsByMonth = function (req,res){

	console.log("inside Host Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({'property.host_id':req.session.user.user_id,bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchHostBillsbyDate = function (req,res){

	console.log("inside Host bill by Date");
	console.log(req.session.user.user_id);
	bill.find({'property.host_id':req.session.user.user_id,bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}

var SearchUserBillsByMonth = function (req,res){

	console.log("inside User Bill by Month");

	var choosenMonth = req.body.month;
     
     var start = new Date(2016,choosenMonth-1,1);
     var end = new Date(2016,choosenMonth,1);

     bill.find({'user.userid':req.session.user.user_id,bill_status:"active",billing_date: { $gte: start,$lt:end}}, function (err, docs) {

     	if(!docs)
     	{
     		console.log(err);
     	}

     	else 
     		console.log(docs);
     	res.status(200);
     	res.json({"bills":docs});


     });

 }


var SearchUserBillsbyDate = function (req,res){

	console.log("inside User bill by Date");
	console.log(req.session.user.user_id);
	bill.find({'user.userid':req.session.user.user_id,bill_status:"active",billing_date:req.body.date},function(err,docs){

		if(!docs)
		{
			console.log(err);
		}
		else
			console.log(docs);
		res.status(200);
		res.json({"bills":docs});

	})

}


exports.SearchBillsByMonth = SearchBillsByMonth;
exports.GenerateBill = GenerateBill;
exports.SearchBillsbyDate = SearchBillsbyDate;
exports.SearchHostBillsbyDate = SearchHostBillsbyDate;
exports.SearchHostBillsByMonth = SearchHostBillsByMonth
exports.SearchUserBillsbyDate = SearchUserBillsbyDate;
exports.SearchUserBillsByMonth = SearchUserBillsByMonth;