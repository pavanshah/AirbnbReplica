var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');



var userSignup = function(req,res){
	console.log("Inside signup user");
	var todayDate = new Date();
	var year = todayDate.getFullYear();
	var month = parseInt(todayDate.getMonth())+1;
	var date = todayDate.getDate();
	var hour = todayDate.getHours();
	var minute = todayDate.getMinutes();
	var second = todayDate.getSeconds();
	var milliSecond = todayDate.getMilliseconds();
	var user_id = year+""+month+""+date+""+hour+""+minute+""+second+""+milliSecond;
	req.body.login.user_id = user_id;
	var user = new Users(req.body.login);
	console.log(user);
	user.save(function(err,result){

		if(!err){
			console.log(result);
			res.status(200);
			res.json({"result":"user LoggedIn"});

		}
		else{
			console.log("inside error");
			console.log(err);
		}
			
	});
};

var userLogIn = function(req,res){
	console.log("Inside user sign in");
	

	res
	.status(200)
	.send({"result":"user Logged in"});
	
};

var deleteLogin = function(req,res){
	console.log("Inside user Delete");
	

	res
	.status(200)
	.send({"result":"user Deleted"});
};


var updateLogin = function(req,res){
	console.log("Inside user Update");
	

	res
	.status(200)
	.send({"result":"user Updated"});
};

var getLogin = function(req,res){
	console.log("Inside Get user");
	

	res
	.status(200)
	.send({"result":"user details"});
	
}; 



exports.userSignup = userSignup;
exports.userLogIn = userLogIn;
exports.deleteLogin = deleteLogin;
exports.updateLogin = updateLogin;
exports.getLogin = getLogin;

