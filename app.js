
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var expressIndex = require('./routes/index');
var expressSelect = require('./routes/senateSelect');
var expressGovernors = require('./routes/governorSelect');
var expressResults = require('./routes/results');
var expressAbout = require('./routes/about');
var expressGallery = require('./routes/gallery');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', expressIndex.view);
app.get('/senateSelect', expressSelect.viewSelect);
app.get('/governorSelect', expressGovernors.viewGovernors);
app.get('/results', expressResults.viewResults);
app.get('/about', expressAbout.viewAbout);
app.get('/gallery', expressGallery.viewGallery);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
