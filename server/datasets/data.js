var mongoose = require('mongoose');
module.exports = mongoose.model('Data', {
	nr_grid_frequency: String,
	 nr_dsm_rate: String,
	 nr_time: String,
	wr_grid_frequency: String,
	wr_dsm_rate: String,
	wr_time: String,
	er_grid_frequency: String,
	er_dsm_rate: String,
	er_time: String,
	sr_grid_frequency: String,
	sr_time: String
	
});



