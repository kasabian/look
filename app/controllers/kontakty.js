var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var kontakty = {};


kontakty.index = function (req, res, next) {

	
	res.render("kontakty/index");
}

module.exports = kontakty;