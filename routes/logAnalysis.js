var winston = require('winston');

var clicksPerPage = function(req, res)
{
	winston.remove(winston.transports.File);
	winston.add(winston.transports.File, { filename: 'public/LogFiles/AirbnbAnalysis.json' });

	var login_page_count = 0, logout_page_count = 0;

	var options = {
    from: new Date - 24 * 60 * 60 * 1000,
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
    }

    var resultObj = {"login_page" : login_page_count , "logout_page" : logout_page_count};

    console.log(resultObj);

    res.json({"result ":resultObj});
  });
}


exports.clicksPerPage = clicksPerPage;

