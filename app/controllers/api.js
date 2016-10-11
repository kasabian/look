var mongoose = require('mongoose'),
	express = require('express');

var Services = require('../models/services');	
var ServiceItem = require('../models/service_item');	

var PhotosCategory = require('../models/photos_category');	
var PhotosItem = require('../models/photo_item');	
var PriceEpil = require('../models/price_epil');	
var Action = require('../models/actions');

	
var app = express();	
var api = {};

var async = require('async');

api.get_services = function (req, res, next) {

	Services.getFull(function(err, services) {
		if(err) throw err;

		res.send(services);
	});
}


api.create_service = function (req, res, next) {
	var service =  new Services(req.body);
	
	service.save(function(err, service) {
		if(err) throw err;
		
		res.send(service);
	});
}

api.remove_service = function (req, res, next) {
	Services.findOne({

		_id : req.body.service_id

	}, function(err, service) {
		if(err) throw err;

		if(service) {

			service.remove(function(err) {
					res.send({
						status: !err
					});
			}); 

		} else {

			res.send({
				status: false
			});
		}
		
	});

}

api.update_service = function (req, res, next) {

	Services.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, item) {
 		
 		if (err) throw err;
  		
  		res.send({
			status: true
		}); 
	});

}

api.create_service_item = function (req, res, next) {

	var sItem =  new ServiceItem(req.body);
	
	sItem.save(function(err, item) {
		if(err) throw err;
		
		res.send(item);
	});
}

api.remove_service_item = function (req, res, next) {

	ServiceItem.findOne({
		_id : req.body.item_id
	}, function(err, item) {
		if(err) throw err;

		if(item) {

			item.remove(function(err) {
					res.send({
						status: !err
					});
			}); 

		} else {

			res.send({
				status: false
			});
		}
		
	});

}

api.update_item = function(req, res, next) {
	ServiceItem.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, item) {
 		
 		if (err) throw err;
  		
  		res.send({
			status: true
		}); 
	});
}

api.get_all_photos_category = function (req, res, next) {

	PhotosCategory.getFull(function(err, categories) {
		if(err) throw err;

		res.send(categories);
	});
}



api.create_photos_category = function(req, res, next) {
	var cat =  new PhotosCategory(req.body);
	
	cat.save(function(err, cat) {
		if(err) throw err;
		
		res.send(cat);
	});
}


api.remove_photos_category = function(req, res, next) {
	
	PhotosCategory.findOne({
		_id : req.body.photos_category_id
	}, function(err, item) {
		if(err) throw err;

		if(item) {

			item.remove(function(err) {
					res.send({
						status: !err
					});
			}); 

		} else {

			res.send({
				status: false
			});
		}
		
	});
}

api.create_photos_items = function(req, res, next) {

	PhotosItem.create(req.body, function(err, collections) {

		if(err) throw err;		
		
		res.send({
			collections: collections
		});
	});
}


api.remove_photo_item = function(req, res, next) {

	PhotosItem.findOne({
		_id : req.body.photo_item_id
	}, function(err, item) {
		if(err) throw err;

		if(item) {

			item.remove(function(err) {
					res.send({
						status: !err
					});
			});

		} else {
			res.send({
				status: false
			});
		}
		
	});
}

api.get_epils_prices = function(req, res, next) {

	PriceEpil.find({})
			 .sort({ 'created' : -1})
			 .exec( function(err, items) {
			 	if(err) throw err;
			 	
			 	res.send(items);
			 });
}

api.create_epil = function (req, res, next) {
	var service =  new PriceEpil(req.body);
	
	service.save(function(err, service) {
		if(err) throw err;
		
		res.send(service);
	});
}

api.remove_epil = function (req, res, next) {
	PriceEpil.findOne({

		_id : req.body.service_id

	}, function(err, service) {
		if(err) throw err;

		if(service) {

			service.remove(function(err) {
					res.send({
						status: !err
					});
			}); 

		} else {

			res.send({
				status: false
			});
		}
		
	});

}

api.update_epil = function(req, res, next) {

	PriceEpil.findByIdAndUpdate(req.body._id, { $set: req.body}, function (err, item) {
 		if (err) throw err;
  		
  		res.send({
			status: true
		}); 
	});
}

api.get_actions = function() {

	Action.find({})
			 .sort({ 'created' : -1})
			 .exec( function(err, items) {
			 	
			 	res.send(items);
			 });
}

api.create_action = function (req, res, next) {
	var action =  new Action(req.body);
	
	action.save(function(err, action) {
		if(err) throw err;
		
		res.send(action);
	});
}

api.remove_action = function (req, res, next) {
	Action.findOne({

		_id : req.body.action_id

	}, function(err, action) {
		if(err) throw err;

		if(action) {

			action.remove(function(err) {
					res.send({
						status: !err
					});
			}); 

		} else {

			res.send({
				status: false
			});
		}
		
	});

}

module.exports = api;