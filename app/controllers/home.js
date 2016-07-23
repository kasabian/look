var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var home = {};


home.index = function (req, res, next) {
	res.render("home/index");
}

module.exports = home;