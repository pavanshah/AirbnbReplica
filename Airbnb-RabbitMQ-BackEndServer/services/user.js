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

function SignUp(msg,callback){

  console.log("User Registration in RabbitMQ");

  console.log(msg);

  Users.find({"email":msg.user.email},function(err,user){
    console.log("found");
    console.log(user);
    
    if(user.length > 0){
      callback(null,{"status":400,"result":"user already present"});
     
    }

    newUser = Users(msg.user);
    newUser.save(function(err,result){
        if(!err){
          console.log(result);
          callback(null,{"status":200,"result":"User Created"});
          
        }
        else{
          console.log("inside error");
          console.log(err);
          callback(err,null);
        }
          
      });



});

};

exports.SignUp = SignUp;
exports.authenticate = authenticate;




