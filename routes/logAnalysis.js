var winston = require('winston');
var Property = require('../Models/property');

var clicksPerPage = function(req, res)
{
    winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });
    winston.remove(winston.transports.Console);

    var login_page_count = 0, logout_page_count = 0, property_page_count = 0, propertydescription_page_count = 0;
    var bill_page_count = 0, signup_page_count = 0, editprofile_page_count = 0, trip_page_count = 0, host_page_count = 0;

    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

    //find data for last 10 days
    var options = {
    from: oldDate,
    until: new Date,
    limit: 100,
    start: 0,
    order: 'desc',
    fields: ['page_name']
  };

    winston.query(options, function (err, results) {
    if (err) {
      throw err;
    }
 
    for(var i = 0 ; i < results.file.length ; i++)
    {
        console.log(results.file[i].page_name);
        if(results.file[i].page_name == "login_page")
        {
            login_page_count++;
        }

        if(results.file[i].page_name == "logout_page")
        {
            logout_page_count++;
        }

        if(results.file[i].page_name == "property_page")
        {
            property_page_count++;
        }

        if(results.file[i].page_name == "propertydescription_page")
        {
            propertydescription_page_count++;
        }

        if(results.file[i].page_name == "signup_page")
        {
            signup_page_count++;
        }

        if(results.file[i].page_name == "editprofile_page")
        {
            editprofile_page_count++;
        }

        if(results.file[i].page_name == "trip_page")
        {
            trip_page_count++;
        }

        if(results.file[i].page_name == "host_page")
        {
            host_page_count++;
        }

        if(results.file[i].page_name == "bill_page")
        {
            bill_page_count++;
        }
    }

    var resultObj = {"login_page" : login_page_count , "logout_page" : logout_page_count, 
                    "property_page" : property_page_count, "propertydescription_page" : propertydescription_page_count,
                    "signup_page" : signup_page_count, "trip_page" : trip_page_count, "host_page" : host_page_count,
                    "editprofile_page" : editprofile_page_count, "bill_page" : bill_page_count
                    };

    res.json({"clicksPerPage ":resultObj});
  });

    winston.add(winston.transports.Console);
}



var propertyClick = function(req, res)
{
    var host = req.body.analyze.host_id;

    winston.add(winston.transports.File, { filename: 'public/LogFiles/PropertyClickAnalysis.json' });
    winston.remove(winston.transports.Console);

    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

    var options = {
    from: oldDate,
    until: new Date,
    limit: 100,
    start: 0,
    order: 'desc',
    //fields: ["property_id"]
  };

    winston.query(options, function (err, results) {
    if (err) {
      throw err;
    }

    var properties = [];

    for(var i = 0 ; i < results.file.length ; i++)
    {
        if(host == results.file[i].host_id)
        {
            properties.push(results.file[i].property_id);
        }
    }

    console.log(properties);

    var query = Property.find({});
    query.where('host_id', req.body.analyze.host_id);
    var array = [];

    query.exec(function(err, user){
        if(user)
        {
                
            for(var i = 0; i< user.length ; i++)
            {
                var countProp = 0;
                console.log(user[i].property_id);

                for(var j = 0 ; j< properties.length ; j++)
                {
                    if(properties[j] == user[i].property_id)
                    {
                        countProp++;
                    }
                }

                array.push([user[i].property_id, countProp]);
            }

            console.log("final array "+array);

            res.json({"clicksPerProperty ":array});

        }
        else
        {
            console.log(err);
        }
    });

   });
}


var userTracking = function(req, res)
{
    var finalArray = [];

    winston.add(winston.transports.File, { filename: 'public/LogFiles/UserTracking.json' });
    winston.remove(winston.transports.Console);

    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

        var options = {
            from: oldDate,
            until: new Date,
            limit: 100,
            start: 0,
            order: 'asc',
            fields: ["session_id", "user_email", "user_tracker", "timestamp"]
        };

        winston.query(options, function (err, results) {
            if (err) {
            throw err;
            }


           for(var i = 0 ; i < results.file.length ; i++)
           {
                //console.log("here "+results.file[i].session_id+","+results.file[i].user_email+results.file[i].user_tracker);

                if(i == results.file.length-1)
                {
                    finalArray.push([results.file[i].session_id, results.file[i].user_email, results.file[i].user_tracker, results.file[i].timestamp]);
                    res.json({"usertracker ": finalArray});
                    break;
                }

                if(results.file[i].session_id == results.file[i+1].session_id)
                {
                    continue;
                }
                else
                {
                    finalArray.push([results.file[i].session_id, results.file[i].user_email, results.file[i].user_tracker, results.file[i].timestamp]);
                }
           }

        });

        winston.add(winston.transports.Console);
}

var propertyReviews = function(req, res)
{
    /*
    var host = req.body.analyze.host_id;

    winston.add(winston.transports.File, { filename: 'public/LogFiles/PropertyReviewsAnalysis.json' });
    winston.remove(winston.transports.Console);


    var oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

        var options = {
            from: oldDate,
            until: new Date,
            limit: 100,
            start: 0,
            order: 'desc',
            fields: ["property_id", "host_id", "rating", "timestamp"]
        };

        winston.query(options, function (err, results) {
            if (err) {
            throw err;
            }

            var propArr = [];

            console.log(results);


            for(var i = 0 ; i < results.file.length ; i++)
            {
                if(results.file[i].host_id == host)
                {
                    propArr.push([{ 'property_id' : parseInt(results.file[i].property_id), rating : results.file[i].rating, timestamp : results.file[i].timestamp}])
                }
            }

            console.log(propArr[0].property_id);

            for (var i=0; i < propArr.length-1; i++) {
                console.log("here "+propArr[i].property_id);
                if (propArr[i].property_id > propArr[i+1].property_id) {
                var temp = propArr[i].property_id;
                propArr[i].property_id = propArr[i+1].property_id;
                propArr[i+1].property_id = temp;
                }
            }

            console.log("sorted "+propArr);

            res.json(propArr);    
            
        });
        */
        winston.add(winston.transports.Console);
}

exports.userTracking = userTracking;
exports.clicksPerPage = clicksPerPage;
exports.propertyClick = propertyClick;
exports.propertyReviews = propertyReviews;