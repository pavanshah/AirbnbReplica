	//super simple rpc server example
var mongoose = require('mongoose');
var amqp = require('amqp')
, util = require('util');
property = require('./services/properties');
var user = require('./services/user');

var login = require('./services/login');

//require('./services/mongo')();



var mongoSessionConnectURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./services/mongo");

var cnn = amqp.createConnection({host:'127.0.0.1'});


var express = require('express');
var app = express();
app.use(expressSession({
  secret: 'cmpe273_airbnb_team9',
  resave: false,  //don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  duration: 30 * 60 * 1000,    
  activeDuration: 5 * 60 * 1000,
  store: new mongoStore({
    url: mongoSessionConnectURL
  })
}));
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var passport = require('passport');
// require('./services/passport')(passport);
// app.use(app.router);
// app.use(passport.initialize());

mongoose.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('ebay_login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			login.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});



	console.log("listening on User Queue");
	cnn.queue('user_queue',function(q)

	{
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			

			switch(message.func){

				case "Authenticate":

					user.authenticate(message,function(err,res){

						console.log("printing response");
						console.log(res);
							//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;

				case "SignUp":
					user.SignUp(message,function(err,res){

						//return index sent
							cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;	

				case "UpdateUser":
					user.updateProfile(message,function(err,res){

						cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
					break;
				case "getUserProfile":
					user.getUserProfile(message,function(err,res){

						cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;
				case "getHost":
					user.getHostProfile(message,function(err,res){
						
					cnn.publish(m.replyTo, res, {
								contentType:'application/json',
								contentEncoding:'utf-8',
								correlationId:m.correlationId
							});
					});
				break;

		};
	});
 	})
});
