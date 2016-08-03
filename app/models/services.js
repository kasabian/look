var mongoose = require('../../lib/mongoose');
var async = require('async');

var ServiceItem = require('../models/service_item');

var Schema = mongoose.Schema;

var schema = new Schema({
	name:{
		type: String,
		required: true
	},

	src: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: false
	},

	items: {
		type: Array,
		required: false
	},

	created:{
		type: Date,
		default: Date.now
	}
});


schema.statics.getFull = function(mainCallBack) {
	var self = this;

	this.find({})
		.sort({ 'created' : -1})
		.exec(function(err, services) {
			if(err) throw err;

			async.each(services, 

				function(service, callback) {
					
					ServiceItem.find({service_id:service._id})
						.sort({ 'created' : -1})
						.exec( function(err, items) {
							
						if(err) throw err;

						service.items = items;
     					callback();	
					});
				}, 

				function(err){

					mainCallBack(err, services);

				}
			);
	});

};

module.exports = mongoose.model("Services", schema);





