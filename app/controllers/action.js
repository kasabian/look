var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var action = {};


action.index = function (req, res, next) {
	res.render("action/index");
}

module.exports = action;