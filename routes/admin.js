var bodyParser = require('body-parser').json();
var mysqlPool = require("./mysql").pool;
var mongo = require("./mongo");
var mongoURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('../Models/user');
var Bills = require('../Models/bill');
var mongodb = require('mongodb');


var deleteUser = function(req,res){
	console.log("Inside delete user");
	console.log(req.body);
	var o_id = new mongodb.ObjectID(req.body.id);
	
	Users.remove({"_id":o_id},function(err,user){
		if(err){
			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		res
		.status(200)
		.send({"result":"success"});
		
	})
	
	
}
var authorizeUser = function(req,res){
	console.log("Inside auth user");
	console.log(req.body);
	var o_id = new mongodb.ObjectID(req.body.id);
	
	Users.update({"_id":o_id}, { user_status: 'active' },  function(err,user){
		if(err){
			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		res
		.status(200)
		.send({"result":"success"});
	})
	
};

var getProfileForAdmin = function(req,res){
	console.log(req.query.id);

	var o_id = new mongodb.ObjectID(req.query.id);
	
	Users.find({"_id":o_id},function(err,user){

		res
		.status(200)
		.send({"result":user});
		
	})
	
}

var getBillForAdmin = function(req,res){
	
	if(req.query.query == "new"){
		console.log("Inside new");
	Bills.find({},function(err,bills){
		console.log(bills);
		

		res
		.status(200)
		.send({"result":bills});
	})
	}
	else{
		console.log("Inside elseeeeeeee");

		
		
			console.log(req.query.querytype);
			console.log(req.query.date);
			console.log(req.query.month);
			
	if(req.query.month != ""){
		console.log("Inside month query");
		Bills.aggregate([{$project: {billing_date: 1, month: {$month: '$billing_date'}}},
				  {$match: {month: Number(req.query.month)}}],function(err,bills){
			console.log(bills);
			

			res
			.status(200)
			.send({"result":bills});
		})
				  
				  
	}		
	else{
		console.log("Inside date query");
		
		var dateObj = new Date(req.query.date);
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		
		Bills.aggregate([{$project: {billing_date: 1,from_date: 1, 
		    month: {$month: '$billing_date'},
		    dayOfMonth: {$dayOfMonth: '$billing_date'},
		    year: {$year: '$billing_date'}}},
		    {$match: {month: month,dayOfMonth: day,year: year}}],function(err,bills){
			console.log(bills);
			

			res
			.status(200)
			.send({"result":bills});
		})
	}
			
		
		
	}
	
}

var getHostsForAdmin = function(req,res){
	console.log(req.query);
	
	if(req.query.query == "new"){
		console.log("Inside new");
		
		Users.find({},function(err,user){
			console.log(user);
			
	
			res
			.status(200)
			.send({"result":user});
		})
	}
	else{
		var searchObject = {};
		
		if(req.query.type != "" && req.query.address != ""){
			searchObject = {"UserType":req.query.type,"address.city":req.query.address.toLowerCase()};
		}
		else if(req.query.address != ""){
			searchObject = {"address.city":req.query.address.toLowerCase()}; 
		}
		else if(req.query.type != ""){
			searchObject = {"UserType":req.query.type}; 
		}
		
		//if(req.query.type != "" && req.query.address != ""){
		
		console.log(searchObject);
		Users.find(searchObject,function(err,user){
			console.log(user);
	
			res
			.status(200)
			.send({"result":user});
		})
		
		//}
	}
	
}

var getPropertyPerYear = function(req,res){
	console.log("inside get property per year");
	console.log(req.query);
	
	mysqlPool.getConnection(function(err, connection) {
		if(err){
			console.log("failed to connec in error");
			console.log(err);

			res
			.status(200)
			.send({"result":"failed"});
			return;
		}
		
		var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = "+req.query.year +" group by property_name limit 10";
        connection.query(sqlBarChart,function(err,barResults){
        	
        	var barResultsJson = JSON.stringify(barResults);
            var barResultOutput = JSON.parse(barResultsJson);
            connection.release();
            res
			.status(200)
			.send({"result":barResultOutput});
			return;
        });
		
	})
	
}
var getMainDashboard = function(req,res){
	console.log("I am here to get dashboard details");
	req.session.admin = "loggedin";
	if(typeof req.session.admin === "undefined"){
		res
		.status(200)
		.send({"result":"login"});
		return;
	}
	
	mysqlPool.getConnection(function(err, connection) {
		sql = "select host_name,sum(total_cost) cost from billinglogs group by host_name order by cost desc limit 10";
		if(err){
			console.log("failed to connec in error");
			console.log(err);
			
		}
		else{
		console.log("connection succesful");
		//console.log(connection);
		connection.query(sql,function(err,results){
			//console.log(results);
			var result = JSON.stringify(results);
            var resultData = JSON.parse(result);		  
            //console.log(resultData);
			//connection.release();
            
            
            var sqlBarChart = "select property_name as label,sum(total_cost) value from billinglogs where date = '2016' group by property_name limit 10";
            connection.query(sqlBarChart,function(err,barResults){
            	
            	var barResultsJson = JSON.stringify(barResults);
                var barResultOutput = JSON.parse(barResultsJson);
                
                
                var sqllineChart = "select city,date,sum(total_cost) value from billinglogs group by city,date";
                connection.query(sqllineChart,function(err,lineResults){
                
                	var lineResultsJson = JSON.stringify(lineResults);
                    var lineResultOutput = JSON.parse(lineResultsJson);
                
                    console.log("Inside................. line")
                	//console.log(resultData);
                    //console.log(barResultOutput);
                    console.log(lineResultOutput);
                    var lineOutput = [];
                    for(var i=0;i<lineResultOutput.length;i++){
                    	//console.log(lineResultOutput[i].city);
                    	var found = 0;
                    		for(var j=0;j<lineOutput.length;j++){
                    			if(lineOutput[j].key == lineResultOutput[i].city){
                    				lineOutput[j].values.push([Number(lineResultOutput[i].date),lineResultOutput[i].value]);
                    				found = 1;
                    				break;
                    			}
                    		}                 
                    		
                    		if(found == 0){
                    			lineOutput.push({key:lineResultOutput[i].city,values:[[2014,0],[Number(lineResultOutput[i].date),lineResultOutput[i].value]]});
                    		}
                    }
                    
                    for(var k=0;k<lineOutput.length;k++){
                    	console.log(lineOutput[k].key);
                    	console.log(lineOutput[k].values);
                    }
                    
                    //console.log(lineOutput);
                    res
        			.status(200)
        			.send({"result":resultData,"barchart":barResultOutput,"linechart":lineOutput});
                });
                
            	
            })
			
		});
			
		
	}
	})

}

exports.getMainDashboard = getMainDashboard;
exports.getPropertyPerYear = getPropertyPerYear;
exports.getHostsForAdmin = getHostsForAdmin;
exports.getBillForAdmin =getBillForAdmin;
exports.getProfileForAdmin = getProfileForAdmin;
exports.authorizeUser = authorizeUser;
exports.deleteUser = deleteUser;