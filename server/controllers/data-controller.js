url = 'http://nrldc.in/';
url2 = 'http://www.wrldc.in/';
url3 = 'http://www.srldc.org/';
url4 = 'http://www.erldc.org/';


var json = { 	nr_grid_frequency : "", nr_dsm_rate : "",nr_time: "",
				wr_grid_frequency : "", wr_dsm_rate : "",wr_time: "",
				er_grid_frequency : "",	er_dsm_rate : "",er_time: "",
				sr_grid_frequency : "", sr_time: ""
			};

var request = require('request');
var cheerio = require('cheerio');
var Data = require("../datasets/data");

function nr(){
 	 request(url, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	        $('#black-studio-tinymce-14').filter(function(){
	        var data_1 = $(this).find('p').slice(1,2);      
	        var data_2 =   $(this).find('p').slice(2,3);
	        var data_6 =   $(this).find('p').slice(3,4);           
	        json.nr_grid_frequency = data_1.find('span').first().text();
            json.nr_dsm_rate = data_2.find('span').first().text();
	        json.nr_time= data_6.find('span').first().text();

        
    	})

 		}// If statement ends here

	}) 
};

	function er(){
 	 request(url4, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	        $('body').filter(function(){
	        var data_9  =  $(this).find('#ctl00_ContentPlaceHolder1_Label1');    
	        var data_10 =  $(this).find('#ctl00_ContentPlaceHolder1_Label5');
	        //data_10=data_10/100;
	        var data_11 =  $(this).find('#ctl00_ContentPlaceHolder1_Label2');          
	            
	        json.er_grid_frequency = data_9.text();   
	        json.er_dsm_rate = data_10.text();
	        json.er_time= data_11.text();  

	        console.log(json);      

        
    	})

 		}
	}) 
};


function sr(){
	request(url3, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	  	    $('body').filter(function(){
	        var data_7 = $(this).find('#ctl00_ContentPlaceHolder1_Label1');      
	        var data_8 = $(this).find('#ctl00_ContentPlaceHolder1_Label1a'); 
	        console.log(data_7.html());       
	        json.sr_grid_frequency = data_7.text();  	           
	        //json.sr_dsm_rate= data_8.text();       
	        json.sr_time= data_8.text();

        
    	})

 		}// If statement ends here

	}) 
};


 function wr(){
 	 request(url2, function(error, response, html){
	    	if(!error){
	        var $ = cheerio.load(html);
	  	    $('body').filter(function(){
	        var data_4 = $(this).find('#ctl00_ContentPlaceHolder1_Label1');      
	        var data_5 =   $(this).find('#ctl00_ContentPlaceHolder1_Label2');
	        var data_6 = $(this).find('#ctl00_ContentPlaceHolder1_ftime');        
	        json.wr_grid_frequency = data_4.text();  	           
	        json.wr_dsm_rate= data_5.text();       
	        json.wr_time= data_6.text();
    	})
 		}// If statement ends here
	}) 
 	console.log(json);
 	 var data = new Data(json);
 	 data.save();
};

module.exports.scrapeData = function(req , res){

	 
       nr();
       er();
       sr();
       wr();
       				
       		
     
		 
	

	/*nr();
	er();
	sr();
	wr();
	setInterval(function() {
	nr();
	er();
	sr();
	wr();
}, 60000);*/

	res.status(200);

}


module.exports.getData = function(req , res){

	Data.find({}).sort({_id: -1}).limit(1).exec(function(err , Data){
		if(err){
			res.error(err);
		}else{
			res.json(Data);
		}
	})
}

