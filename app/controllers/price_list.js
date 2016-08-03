var mongoose = require('mongoose'),
	express = require('express');

var Services = require('../models/services');	
var PriceEpil = require('../models/price_epil');	

var app = express();	
var price_list = {};


price_list.index = function (req, res, next) {

	Services.getFull(function(err, services) {
		if(err) throw err;

		var services = services;


		PriceEpil.find({})
			 .sort({ 'created' : -1})
			 .exec( function(err, items) {
			 	if(err) throw err;

			 	res.render("price_list/index", { services: services, epil_items: items });
			 });

		
	});
	
	
}

module.exports = price_list;