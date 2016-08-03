var mongoose = require('../../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	big_url:{
		type: String,
		required: true
	},

	photos_category_id:{
		type: String,
		required: true
	},

	created:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("PhotosItem", schema);