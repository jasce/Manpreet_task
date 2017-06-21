var mongoose = require('mongoose');
module.exports = mongoose.model('Data', {
	nr_grid_frequency: Number,
	 dsm_rate: Number,
	wr_grid_frequency: Number,
	deviation_rate: Number	
});

