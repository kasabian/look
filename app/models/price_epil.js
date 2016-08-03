var mongoose = require('../../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	service_type_name:{
		type: String,
		required: true
	},

	value_1:{
		type: Number,
		required: true
	},

	value_2:{
		type: Number,
		required: true
	},

	value_3:{
		type: Number,
		required: true
	},

	created:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("PriceEpil", schema);