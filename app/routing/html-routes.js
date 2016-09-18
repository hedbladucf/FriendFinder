/* REQUIRES: NPM path */
var path = require('path');

// Exports module
module.exports = function(app){

    // Link to survey page
    app.get('/quiz', function(req,res){
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });

    // Main link to home page
    app.use(function(req,res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
};