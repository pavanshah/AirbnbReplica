var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');



var userSignup = function(req,res){
	console.log("Inside signup host");
	
		

	res
	.status(200)
	.send({"result":"user signed up"});
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

