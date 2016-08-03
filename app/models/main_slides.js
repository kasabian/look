var mongoose = require('../../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	
	url:{
		type: String,
		required: true
	},

	created:{
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model("MainSlides", schema);