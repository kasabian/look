var mongoose = require('../../lib/mongoose');
var async = require('async');
var PhotoItem = require('../models/photo_item');

var Schema = mongoose.Schema;

var schema = new Schema({
	name:{
		type: String,
		required: true
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
		.sort({ 'created' : 1})
		.exec(function(err, categories) {
			if(err) throw err;

			async.each(categories, 

				function(category, callback) {
					
					PhotoItem.find({photos_category_id:category._id})
						.sort({ 'created' : -1})
						.exec( function(err, items) {
							
						if(err) throw err;

						category.items = items;
     					callback();	
					});
				}, 

				function(err){

					mainCallBack(err, categories);

				}
			);
	});

};

module.exports = mongoose.model("PhotosCategory", schema);