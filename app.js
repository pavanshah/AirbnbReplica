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

// all environments
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



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
