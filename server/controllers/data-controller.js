url = 'http://nrldc.in/';
url2 = 'http://www.wrldc.in/';
var json = { nr_grid_frequency : "", dsm_rate : "", wr_grid_frequency  : "",deviation_rate: "" };

var request = require('request');
var cheerio = require('cheerio');
var Data = require("../datasets/data");

 function a(){
 	 request(url, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	        $('#black-studio-tinymce-14').filter(function(){
	        var data_1 = $(this).find('p').slice(1,2);      
	        var data_2 =   $(this).find('p').slice(2,3);          
	        json.nr_grid_frequency = data_1.find('span').first().text();	       
	      //  console.log(data.find('span:nth-child(2)').text());        
	       json.dsm_rate = data_2.find('span').first().text();

        
    	})

 		}// If statement ends here

	}) 
};


 function b(){
 	 request(url2, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	  	    $('body').filter(function(){
	        var data_3 = $(this).find('#ctl00_ContentPlaceHolder1_Label1');      
	        var data_4 =   $(this).find('#ctl00_ContentPlaceHolder1_Label2');          
	        json.wr_grid_frequency = data_3.text();  	           
	       json.deviation_rate = data_4.text();       
    	})
 		}// If statement ends here
	}) 

 	 console.log(json);
 	 var data = new Data(json);

 	 data.save();
 	/* fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! ');

	})*/
};
module.exports.scrapeData = function(req , res){

	setInterval(function() {
	a();
	b();
}, 5000);

	res.status(200);

}


module.exports.getData = function(req , res){

	Data.find({}).sort({_id:-1}).limit(1).exec(function(err , Data){
		if(err){
			res.error(err);
		}else{
			res.json(Data);
		}
	})
}

