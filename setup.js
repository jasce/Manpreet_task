var http = require('http');
setInterval(function(){
	http.get("http://man-preet.herokuapp.com/scrape");
}, 300000); // 5 minutes