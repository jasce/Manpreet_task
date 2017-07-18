var http = require('http');
setInterval(function(){
	http.get("http://man-preet.herokuapp.com/scrape");
}, 3000); // 5 minutes