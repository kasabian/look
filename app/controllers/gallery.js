var mongoose = require('mongoose'),
	express = require('express');

var PhotosCategory = require('../models/photos_category');	

	
var app = express();	
var gallery = {};


gallery.index = function (req, res, next) {

	PhotosCategory.getFull(function(err, categories) {
		if(err) throw err;

		res.render("gallery/index", {categories: categories});
	});

	
}

module.exports = gallery;