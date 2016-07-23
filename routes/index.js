var express = require('express');
var router = express.Router();
var	fs = require('fs');

var home = require("../app/controllers/home");
var price_list = require("../app/controllers/price_list");
var gallery = require("../app/controllers/gallery");
var kontakty = require("../app/controllers/kontakty");
var action = require("../app/controllers/action");

router.get('/', home.index);
router.get('/home', home.index);

router.get('/price_list', price_list.index);

router.get('/gallery', gallery.index);

router.get('/kontakty', kontakty.index);

router.get('/action', action.index);


module.exports = router;
