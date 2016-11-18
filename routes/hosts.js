/**
 * New node file
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hosts = require('../Models/host');

var HostSignUp = function(req,res){
	console.log("Inside signup host");
	/*var newHost = Hosts;
	newHost.host_id = "123456";
	newHost.firstname = "yashas";
	newHost.lastname = "malleshappa";
	newHost.email = "yashasm1991@gmail.com";

	console.log(newHost);*/
		

	res
	.status(200)
	.send({"result":"Host Registered"});
};

var HostLogIn = function(req,res){
	console.log("Inside Host sign in");
	

	res
	.status(200)
	.send({"result":"Host Logged in"});
	
};

var DeleteHost = function(req,res){
	console.log("Inside Host Delete");
	

	res
	.status(200)
	.send({"result":"Host Deleted"});
};


var UpdateHost = function(req,res){
	console.log("Inside Host Update");
	

	res
	.status(200)
	.send({"result":"Host Updated"});
};

var GetHost = function(req,res){
	console.log("Inside Get Host");
	

	res
	.status(200)
	.send({"result":"Host details"});
	
}; 

exports.HostSignUp = HostSignUp;
exports.HostLogIn = HostLogIn;
exports.DeleteHost = DeleteHost;
exports.UpdateHost = UpdateHost;
exports.GetHost = GetHost;