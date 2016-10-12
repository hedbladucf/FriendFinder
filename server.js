/* REQUIRES: NPM body-parser, express, & path */
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
// port = 8080, or default
var PORT = process.env.PORT || 3000; 

// Static route
app.use(express.static(__dirname + '/app/public'));

// Manage file types with bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Routing
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

// Listener on PORT = 3000
app.listen(PORT,function() {
    console.log('App listening on PORT: ' + PORT);
});