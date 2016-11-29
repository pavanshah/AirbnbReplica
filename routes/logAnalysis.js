var winston = require('winston');

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

    console.log(results);
 
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

    console.log(resultObj);

    res.json({"result ":resultObj});
  });
}


exports.clicksPerPage = clicksPerPage;