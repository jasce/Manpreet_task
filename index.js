var http = require('http');
setInterval(function(){
	http.get("https://man-preet.herokuapp.com");
}, 300000); // 5 minutes