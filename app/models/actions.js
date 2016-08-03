var mongoose = require('../../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	
	photo_url:{
		type: String,
		required: true
	},

	descount:{
		type: Number,
		required: true
	},

	title:{
		type: String,
		required: true
	},

	description:{
		type: String,
		required: true
	},

	created:{
		type: Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model("Actions", schema);