var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var price_list = {};


price_list.index = function (req, res, next) {

	
	res.render("price_list/index");
}

module.exports = price_list;