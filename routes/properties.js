var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Property = require('../Models/property');
var uniqueIDGenerator = require('../routes/uniqueIDGenerator');
var daterange = require('daterange');
var _ = require('underscore');
var Bill = require('./bill');
var Trip = require('./trip');
var winston = require('winston');

var CreateProperty = function (req,res){

	console.log("inside create property");
	console.log(req.body.property);
	/*
	var todayDate = new Date();
	var year = todayDate.getFullYear();
	var month = parseInt(todayDate.getMonth())+1;
	var date = todayDate.getDate();
	var hour = todayDate.getHours();
	var minute = todayDate.getMinutes();
	var second = todayDate.getSeconds();
	var milliSecond = todayDate.getMilliseconds();
	var property_id = year+""+month+""+date+""+hour+""+minute+""+second+""+milliSecond;
	//Will use the below variable to save the propertyID after the login is done and username is available in the session
	//var property_id = req.session.username+""+year+""+month+""+date+""+hour+""+minute+""+second+""+milliSecond;
	*/
	console.log(req.session.user.user_id);

	req.body.property.host = req.session.user;
	req.body.property.property_id = uniqueIDGenerator.returnUniqueID();
	req.body.property.host_id = req.session.user.user_id;
	req.body.property.ListingDate = new Date();
	
	var newProperty = Property(req.body.property);
	console.log(newProperty);
	newProperty.save(function(err,result){

		if(!err){
			console.log(result);
			res.status(200);
			res.json({"result":"Property created"});

		}
		else
			console.log(err);
	});


}

function filter(properties,start_date,end_date) {
    //var userProvidedRange = daterange.create(new Date(2017,3,2),new Date(2017,3,11));
    var filteredProperties = [];
    //console.log("start date",start_date);
    //console.log("end_date",end_date);
    var userProvidedRange = daterange.create(new Date(start_date),new Date(end_date));
    _.each(properties,function(property){
      //console.log(property);
      if(!property.bookings || property.bookings.length==0){
        filteredProperties.push(property);
      }

      if(property.bookings && property.bookings.length >  0){
        var bookings  = property.bookings;
        var isBooked = false;
        _.each(property.bookings,function(booking){
           isBooked = false;
          var bookingRange = daterange.create(new Date(booking.start_date),new Date(booking.end_date));

          if(daterange.equals(userProvidedRange,bookingRange) || daterange.contains(userProvidedRange,bookingRange) || daterange.contains(bookingRange,userProvidedRange) || daterange.overlaps(userProvidedRange,bookingRange)){
            // already booked
            isBooked = true;
          }
          

        });
        
        if(!isBooked){
          filteredProperties.push(property);
        }

      }
    });
    return filteredProperties;
  }


var SearchPropertyByDistance = function(req,res){

	if(req.session.user)
	{
		winston.remove(winston.transports.File);
		winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
		winston.log('info', 'search property button clicked', { page_name : 'property_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

		winston.remove(winston.transports.File);
		winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
		req.session.user.user_tracker.push("property_page");
		winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});
	}

	var lat             = req.body.latitude;
    var long            = req.body.longitude;
    //var distance        = req.body.distance;
    
    var userProvidedRange =  daterange.create(new Date(req.body.start_date),new Date(req.body.end_date));

    var distance = 100;
    //lat = 42;
    //long = -122;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = Property.find({ qty: { $gte: req.body.qty } });

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});
    }
    
    // ... Other queries will go here ... 

    // Execute Query and Return the Query Results
    query.exec(function(err, properties){
        if(err)
            res.send(err);
        else{
       		var refinedProperties = filter(properties,req.body.start_date,req.body.end_date);
       		res.json(refinedProperties); 	
        }
       
    });


}

var FilterProperties = function(req,res){


	Property.find({},function(err,properties){

		if(!err){

			res.status(200);
			res.json(properties);
		}
		else
		{
			console.log(err)
		}


	})

}

var UpdateProperty = function(req,res){
	console.log("inside update property");
	var query = {'property_id':req.body.property.property_id};
	var obj = req.body.property;
	Property.update(query,{$set:obj}, function(error, property) {
		if(!error)
		{
			res.status(200);
			res.json({"result":"Property updated"});
		}
		else{
			console.log(error);
		}
		
	});
}

var bookProperty = function(req,callback) {

	console.log("inside book property");
	//calculateBill(req);


	/*if(req.session.user==undefined||req.session.user==null)
	{
		console.log("No Session");
		//res.status(400);
		callback({"status":400,"response":"Not Authenticated. Please login first"});
	}
	else*/
	
	console.log(req.body);
	console.log(req.session.user);
	var query = {'property_id':req.body.property.property_id};
	var obj = {"start_date":req.body.bookingDates.start_date, "end_date":req.body.bookingDates.end_date, "user_email":req.session.user.emailId};
	Property.update(query,{$push:{bookings:obj}}, function(error, property) {
		if(!error)
		{
			//res.status(200);*/
			callback({"status":200,"result":"Property Booked","property":property});
		}
		else{
			console.log(error);
		}
		
	});

}

var SearchPropertyById = function (req,res){

	//log capture
	//remove previous file everytime and add the one in which next log is to be stored
	winston.remove(winston.transports.File);
	winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
	winston.log('info', 'property clicked', { page_name : 'propertydetails_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	winston.remove(winston.transports.File);
	winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
	req.session.user.user_tracker.push("propertydetails_page");
	winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});

	//var retrivedProperty = mongoose.model('Property',Property);
	console.log(req.body);
	
	Property.findOne({"property_id":req.body.property_id},function(err,property){
		//console.log("err",err);
		//console.log("property",property);
		if(!err){


			winston.remove(winston.transports.File);
			winston.add(winston.transports.File, { filename: 'public/LogFiles/PropertyClickAnalysis.json' });
			winston.log('info', 'property clicks updated', {"property_id" : req.body.property_id, "host_id" : property.host_id, "user_email" : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

			res.status(200);
			res.json(property);
		}
		else
		{
			console.log(err);
			res.status(400);
			res.json({"response":"Bad Request"});
			
		}

	});

}

var ConfirmBooking = function (req,res){

	console.log("ConfirmBooking called");

	if(req.session.user==undefined||req.session.user==null)
	{
		console.log("No Session");
		//res.status(400);
		res.status(401);
		res.json({"response":"Not Authenticated. Please login first"});
	}


	winston.remove(winston.transports.File);
	winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
	winston.log('info', 'pay now clicked', { page_name : 'success_page', user_email : req.session.user.emailId, city : req.session.user.address.city, state : req.session.user.address.state, country : req.session.user.address.country});

	winston.remove(winston.transports.File);
	winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
	req.session.user.user_tracker.push("success_page");
	winston.log('info', 'user tracker updated', {session_id : req.session.user.session_id, user_email : req.session.user.emailId, "user_tracker" : req.session.user.user_tracker});

	bookProperty(req,function(propertyResponse){

		console.log("Inside Response for bookProperty");
		console.log(propertyResponse);

		if(propertyResponse.status!=200)
		{
			res.status(400);
			res.json(propertyResponse);
		}
		else
		{
			 
			var billObj =  {
							    "bill":{
							        
							    "billing_date" : new Date(),
							    "from_date" : req.body.bookingDates.start_date,
							    "to_date" : req.body.bookingDates.end_date,
							    "property" : req.body.property,
							    "user" : {"userid":"281521057","email":"pavanshah77@gmail.com"},
							    "trip_amount" : req.body.trip_amount
							    
							    }
							}

			

			req.body.bill = billObj.bill;
			
			Bill.GenerateBill(req, function(billResponse){

				console.log("inside bill response");

				console.log(billResponse.bill);
				console.log("Property Response");
				console.log(propertyResponse);

				if(propertyResponse.status==200&&billResponse.status==200)
				{
					var generatedBill = billResponse.bill;
					console.log("final objects:");
					console.log(generatedBill);



					var tripObject = {
						//trip_id : String,
						"property" : {
							"property_id" : billResponse.bill.property.property_id
						},
						"user_id":"281521057" ,//change the userid to session userid
						"user_emailId" : req.session.user.emailId,
						"bill" : {
							"billing_id": billResponse.bill.billing_id,
							"trip_amount" : billResponse.bill.trip_amount
						},	
						"trip_start_date" : billResponse.bill.from_date,
						"trip_end_date" : billResponse.bill.to_date	
					};

					//req.body.tripObject = tripObject;

					Trip.createTrip(tripObject, function(tripResponse){
						if(propertyResponse.status==200&&billResponse.status==200&&tripResponse.status==200)
						{
							res.status(200);
							res.json({"Result:":"Property Booked, Bill Generated and Trip created","trip":tripResponse.trip_details});
							
						}
					} );

				}
				else
				{
					res.status(400);
					res.json({"Result":"Error Booking Property","PropertyResponse":propertyResponse.result,"BillingResponse":billResponse.result});
				}

			})



			
		}
	});

}

var calculateBill = function (req,res)
{
	//console.log("base price: "+ req.body.property.base_price);

	var noWeekends =0,billAmount=0,weekend_surge=0,holiday_surge=0;
	var WeeklyDiscount=false,MonthlyDiscount=false,HolidaySeason=false;
	var NumberOfDays = (((new Date(req.body.bookingDates.end_date) - new Date(req.body.bookingDates.start_date))/86400000)+1);
	if(NumberOfDays>6){
		if(NumberOfDays>30){
			MonthlyDiscount=true;
		}
		else
			WeeklyDiscount = true;
	}
	var NumberofWeekends = 0;
	console.log("Number of days:"+NumberOfDays);

	for(var i=0;i<NumberOfDays;i++){

		var currentDate = new Date(req.body.bookingDates.start_date);
		currentDate.setDate(currentDate.getDate() + i);

		console.log(currentDate+"is Current Date a weekend: "+ ((currentDate.getDay()==0 )|| (currentDate.getDay()==6)));
		if((currentDate.getDay()==0 )|| (currentDate.getDay()==6))
		{
			NumberofWeekends++;
		}
	}

	if((((new Date(req.body.bookingDates.end_date)).getMonth()==11)||((new Date(req.body.bookingDates.end_date)).getMonth()==10)) && (((new Date(req.body.bookingDates.start_date)).getMonth()==11)||((new Date(req.body.bookingDates.start_date)).getMonth()==10)))
	{
		HolidaySeason = true;
	}


	console.log("Weekend"+WeeklyDiscount + "Monthly"+ MonthlyDiscount +"PeakSeason"+ HolidaySeason);

	console.log(req.body.property.princing_catalog);


		if(HolidaySeason==true){

			base_bill = Math.round( (NumberOfDays * req.body.property.base_price) * 1e2 ) / 1e2  ;
			holiday_surge = Math.round((base_bill * req.body.property.princing_catalog.seasonal_surge) *1e2) /1e2;
			discount_amount = 0;
			bill_amount = holiday_surge; 
		}

		else if(MonthlyDiscount==true)
		{
			base_bill = Math.round( (NumberOfDays * req.body.property.base_price) * 1e2)/1e2;

			weekend_surge = Math.round((NumberofWeekends * req.body.property.base_price * (req.body.property.princing_catalog.weekend_surge -1 ))*1e2)/1e2;

			discount_amount = ((base_bill + weekend_surge) *(req.body.property.princing_catalog.monthly_discount));

			bill_amount = Math.round( (base_bill + weekend_surge - discount_amount) *1e2)/1e2 ;


			console.log("Base Bill:"+base_bill+" Weekend surge :"+weekend_surge+"discount_amount: "+discount_amount+ " Final Bill :"+billAmount);
		}

		else if(WeeklyDiscount==true)
		{
			base_bill = Math.round((NumberOfDays * req.body.property.base_price)*1e2)/1e2;
			weekend_surge = Math.round((NumberofWeekends * req.body.property.base_price * (req.body.property.princing_catalog.weekend_surge -1 ))*1e2)/1e2;
			discount_amount = Math.round(((base_bill + weekend_surge) *(req.body.property.princing_catalog.weekly_discount))*1e2)/1e2; 
			console.log("discount amount:"+ discount_amount + "weekly surge:"+req.body.property.princing_catalog.weekly_discount);
			bill_amount = Math.round((base_bill + weekend_surge) *1e2)/1e2;
			console.log("Base Bill:"+base_bill+" Weekend surge :"+weekend_surge+" Weekly discount_amount: "+discount_amount+ " Final Bill :"+billAmount);

		}

		var GeneratedBill = {

			"base_bill":base_bill,
			"holiday_surge" : holiday_surge,
			"discount_amount" : discount_amount,
			"weekend_surge" : weekend_surge,
			"Total_Bill": bill_amount,

			"weekly_discount": req.body.property.princing_catalog.weekly_discount,
			"monthly_discount" :req.body.property.princing_catalog.monthly_discount,
			"Seasonal_surge_rate" : req.body.property.princing_catalog.seasonal_surge,
			"Weekend_surge_rate" : req.body.property.princing_catalog.weekend_surge,

			"NumberOfDays" : NumberOfDays,
			"NumberofWeekends" : NumberofWeekends,
			"Monthly_Discount_Applicable" : MonthlyDiscount,
			"Weekly_Discount_Applicable" : WeeklyDiscount,
			"HolidaySeason" : HolidaySeason,
		}


		res.status(200);
		res.json({"Bill_details":GeneratedBill});

}

var getAuctionableProperties = function (req,res) {

	today = new Date();
	validListingDate= new Date();
	validListingDate.setDate(today.getDate() -3);

	console.log(validListingDate);

	Property.find({'ListingType':"auction","ListingDate":{"$gte":validListingDate}},function(err,properties){

		if(!err){

			res.status(200);
			res.json(properties);
		}
		else
		{
			console.log(err)
		}


	});
}

var placeBid= function(req,res) {

	console.log("inside bid property");
	
	
	console.log(req.body);
	console.log(req.session.user);
	var query = {'property_id':req.body.property.property_id};
	var obj = {"bid_date":new Date(), "user_email":req.session.user.emailId,"bid_value":req.body.bid_value};
	Property.update(query,{$push:{bids:obj}}, function(error, property) {
		if(!error)
		{
			//res.status(200);*/
			res.json({"message":"Bid Placed"});
			//callback({"status":200,"result":"Property Booked","property":property});
		}
		else{
			res.status(500);
			res.json({"message":"Bid failed"});
			console.log(error);
		}
		
	});

}

var getMaxBid = function(req,res) {
	
	var property_id = req.body.property_id;

	Property.findOne({"property_id":req.body.property_id},function(err,property){
		//console.log("err",err);
		//console.log("property",property);
		if(!err){

			var maxBid = _.max(property.bids, function(bid){ return bid.bid_value; });
			console.log("bid_value",maxBid);
			res.status(200);
			res.json(maxBid);
		}
		else
		{
			console.log(err);
			res.status(400);
			res.json({"response":"Bad Request"});
			
		}

	});
}

exports.getAuctionableProperties = getAuctionableProperties;
exports.calculateBill =calculateBill;


exports.SearchPropertyById = SearchPropertyById;
exports.SearchPropertyByDistance = SearchPropertyByDistance;
exports.CreateProperty = CreateProperty;
exports.FilterProperties = FilterProperties;
exports.UpdateProperty = UpdateProperty;
exports.ConfirmBooking = ConfirmBooking;
exports.bookProperty = bookProperty;
exports.placeBid = placeBid;
exports.getMaxBid = getMaxBid;


