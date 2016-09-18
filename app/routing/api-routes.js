/* REQUIRES: friends.js & NPM path */
var friendsData = require('../data/friends.js');
var path = require('path');

module.exports = function(app){

    /* GET REQUESTS 
        Diplays the json data on the page
    */

    app.get('/api/friends', function(req,res){
        res.json(friendsData);
    });

    /* POST REQUESTS 
        Processes data after submission of form
    */

    app.post('/api/friends', function(req,res){
        friendsData.push(req.body);
    });
}