var express = require('express');
//var routes = require('./routes');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var mongoose = require('mongoose');
 //URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://apps92:shim123@ds155727.mlab.com:55727/airbnbproto";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var property = require("./routes/properties");

var user = require("./routes/login");

var host = require("./routes/hosts");




// all environments
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


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*app.use(express.favicon());*/
app.use(logger('dev'));
/*app.use(express.json());*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));
app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));

//app.use(express.bodyParser());
/*app.use(express.cookieParser());*/

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/

//app.get('/', home.signin);

 app.get('/', function(req, res) {
        res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
 app.post('/CreateProperty',property.CreateProperty);
 app.post('/SearchPropertyByDistance',property.SearchPropertyByDistance);
 app.post('/FilterProperties',property.FilterProperties);

app.post('/userSignUp',user.userSignup);
app.post('/userLogIn',user.userLogIn);
app.post('/deleteLogin',user.deleteLogin);

app.post('/updateLogin',user.updateLogin);
app.get('/getLogin',user.getLogin);
 


 
 app.post('/HostSignUp',host.HostSignUp);
 app.post('/HostLogIn',host.HostLogIn);
 app.post('/DeleteHost',host.DeleteHost);
 app.post('/UpdateHost',host.UpdateHost);
 app.get('/GetHost',host.GetHost);




 /*app.post('/UpdateProperty',;*/

mongoose.connect(mongoSessionConnectURL, function(){
  console.log('Connected to mongo at: ' + mongoSessionConnectURL);
  http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });  
});


/*http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/