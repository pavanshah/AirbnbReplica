var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./Models/user');


function authenticate(msg,callback){

	console.log("authenticate method invoked in RabbitMQ");

	console.log(msg);

	Users.findOne({ email: msg.email}, function (err, result) {
  if (err) { 
  	callback(err,null);

  	 }
  if (result) {
     console.log(result);
     callback(null,result);
   
 		 }
 if(!result){
 	console.log("no user");
 	callback(null,"no user");
 }         
 
  
	});
}

exports.authenticate = authenticate;




