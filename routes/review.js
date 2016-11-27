var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');
var newAvgRating = 1;
//var winston = require('winston');

var SubmitReviewAndRating = function(req, res)
{
	console.log("inside submit review");
	
	//review and ratings inserted
	Users.update({"email":req.body.review.email}, {$push : {Reviews : {ratings : req.body.review.Reviews.ratings, feedback : req.body.review.Reviews.feedback, user_id : req.session.user.emailId} } } , function(err, user){
		//needs req.session.user.emailId for testing
		
		if (user) 
		{
			console.log("success");
			RetriveAverageRating(req, res);
			
		} else 
		{
			console.log(err);
		}
		
	})


var RetriveAverageRating = function(req,res)
{
		//average rating retrieved
		Users.findOne({"email":req.body.review.email},function(err,user){
			
			if (user) 
			{
				newAvgRating = ((user.avgrating + req.body.review.Reviews.ratings)/(user.Reviews.length));
				UpdateAverageRating(req, res, newAvgRating);
				console.log("avg rating "+user.avgrating);
				console.log("no of reviews "+user.Reviews.length);
				console.log("New rating "+newAvgRating);
				
			} else 
			{
				console.log(err);
			}
		})
}
	

var UpdateAverageRating = function(req, res, newAvgRating)
{
	console.log("here "+newAvgRating);
	
	Users.update({email:req.body.review.email}, {$set : {avgrating : newAvgRating }}, function(err, user){
		if (user) 
		{
			res.status(200);
			res.json({"result":"Rating changed"});
		} else 
		{
			console.log(err);
		}
		
	})
}
	
	
}

var GetReviews = function(req, res)
{
	//find all reviews
	Users.findOne({"email":req.body.review.email},function(err,user){
		
		if (user) 
		{
			var json_response = {avgrating:user.avgrating, reviews : user.Reviews};
			res.send(json_response);
			
		} else 
		{
			console.log(err);
		}
	})
}


var getRatingsForTrip = function(req,res) {
	console.log("bhakdbhjdvshfwhfvwhvfhzv"+req.body.host_id+""+req.session.user.emailId);
	Users.findOne({$and: [{"user_id":req.body.host_id},{"Reviews":{$elemMatch:{"user_id":req.session.user.emailId}}}]}, function(err, user){
		if(err)
		{
			res.status(401).json({"result":"Not able to fetch user ratings"});
		}
		else
		{
			var a=[];
			if(user != null)
			{
			a=user.Reviews;
			a.forEach(function(element){
				if(element.user_id == req.session.user.emailId)
				{
					console.log("ratingksasakaksahs"+element);
					res
					.status(200)
					.json({"result":element});
				}
			});
			if(user.Reviews.length == 0)
			{
				res.
				status(200).
				json({"result":null});
			}
		}

			/*console.log("ratingksasakaksahs"+user);
			res
			.status(200)
			.json({"result":user});*/
		}
	});
}

var submitReviewForTrip = function(req, res) {
	console.log("review submit"+req.body);

	var query = {"user_id":req.body.host_id};


	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
	//winston.log('info', 'review button clicked', { page_name : 'review_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
	//req.session.user.user_tracker.push("review_page");
	//winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});

	//winston.remove(winston.transports.File);
	//winston.add(winston.transports.File, { filename: 'public/LogFiles/PropertyReviewsAnalysis.json' });
	//winston.log('info', 'review submitted', { rating : req.body.rate, property_id : req.body.property.property_id , host_id : req.body.host_id, user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	Users.update(query, {$push : {Reviews : {ratings : req.body.rate, feedback : req.body.review, user_id : req.session.user.emailId}}}, function(err,response) {
		if(err)
		{
			res.status(401).json({"result":"no user found"});
		}
		else
		{
			res.status(200).json({"result":"review submitted"});
		}
	});

	//res.status(200).json({"result":"submitted"});
}


exports.SubmitReviewAndRating = SubmitReviewAndRating;
exports.GetReviews = GetReviews;
exports.getRatingsForTrip = getRatingsForTrip;
exports.submitReviewForTrip = submitReviewForTrip;