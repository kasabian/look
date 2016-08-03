var mongoose = require('mongoose'),
	express = require('express');

	
var app = express();	
var home = {};


home.index = function (req, res, next) {
	res.render("home/index");
}


home.admin = function (req, res, next) {

	var rootDir = __dirname.replace("app/controllers", "");

	if (app.get('env') === 'development') { 
		 res.sendFile('/js/admin/build/index_dev.html', {root: rootDir + '/public'});
	} else {
		 res.sendFile('/js/admin/build/index.html', {root: rootDir + '/public'});
	}
 
}


module.exports = home;