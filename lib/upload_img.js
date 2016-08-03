var multer  = require('multer');

var sizeOf = require('image-size');

var rootDir = __dirname.replace("lib", "/");

var storage = multer.diskStorage({
	
  destination: function (req, file, cb) {
    cb(null, rootDir + "/public/uploads/" )
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, ''))
  }

})

var upload = multer({ storage: storage });

module.exports = upload;