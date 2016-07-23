var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var gallery = {};


gallery.index = function (req, res, next) {

	
	res.render("gallery/index");
}

module.exports = gallery;