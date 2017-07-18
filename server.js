
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var http = require('http');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/data');
var dataController = require("./server/controllers/data-controller");

app.get('/', function(req,res){ 
	res.sendFile( __dirname + "/index.html");
})
app.use('/app' , express.static( __dirname + "/app" ));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
var port = process.env.PORT || 3000;

app.get('/scrape' , dataController.scrapeData);
app.get('/data' , dataController.getData);

app.listen(port, function() {
console.log("Listening on " + port);
http.get("http://man-preet.herokuapp.com/scrape");
setInterval(function(){
	http.get("http://man-preet.herokuapp.com/scrape");
}, 3000); // 5 minutes
	
});








