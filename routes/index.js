var express = require('express');
var router = express.Router();
var	fs = require('fs');

var basicAuth = require('basic-auth-connect');

var home = require("../app/controllers/home");
var price_list = require("../app/controllers/price_list");
var gallery = require("../app/controllers/gallery");
var kontakty = require("../app/controllers/kontakty");
var action = require("../app/controllers/action");

var api = require("../app/controllers/api");

var upload = require("../lib/upload_img.js");



var auth = basicAuth(function(user, pass, callback) {
 	var result = (user === 'awdasd' && pass === 'awdasd');
 	callback(null /* error */, result);
});


// images

router.post('/upload/img', upload.single('avatar'), function(req, res) {

	req.file['destination'] =  	req.file['destination'].replace(/\S+public/, '');
	req.file['path'] =  req.file['path'].replace(/\S+public/, '');
	req.file['originalname'] = req.file['originalname'].replace(/\s+/, '');

  	res.send(req.file)
});


router.get('/api/get_services', api.get_services);

router.post('/api/create_service', api.create_service);
router.post('/api/update_service', api.update_service);

router.post('/api/remove_service', api.remove_service);

router.post('/api/create_service_item', api.create_service_item);
router.post('/api/remove_service_item', api.remove_service_item);
router.post('/api/update_item', api.update_item);




router.get('/api/get_all_photos_category', api.get_all_photos_category);
router.post('/api/create_photos_category', api.create_photos_category);

router.post('/api/remove_photos_category', api.remove_photos_category);
router.post('/api/create_photos_items', api.create_photos_items);

router.post('/api/remove_photo_item', api.remove_photo_item);

router.get('/api/get_epils_prices', api.get_epils_prices);
router.post('/api/create_epil', api.create_epil);
router.post('/api/remove_epil', api.remove_epil);
router.post('/api/update_epil', api.update_epil);

router.get('/api/get_actions', api.get_actions);
router.post('/api/create_action', api.create_action);
router.post('/api/remove_action', api.remove_action);


router.get(/admin\S+|admin/, auth, home.admin);


router.get('/', home.index);
router.get('/home', home.index);

router.get('/price_list', price_list.index);

router.get('/gallery', gallery.index);

router.get('/kontakty', kontakty.index);

router.get('/action', action.index);


module.exports = router;
