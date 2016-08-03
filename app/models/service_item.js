var mongoose = require('../../lib/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	name:{
		type: String,
		required: true
	},

	price: {
		type: Number,
		required: true
	},

	is_promo: {
		type: Boolean,
		required: true
	},

	promo_count: {
		type: Number,
		required: true
	},

	service_id:{
		type: String,
		required: true
	},

	created:{
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("ServiceItem", schema);





