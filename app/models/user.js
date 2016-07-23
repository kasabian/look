var mongoose = require('../../lib/mongoose');
var async = require('async');

var Schema = mongoose.Schema;

var schema = new Schema({
	name:{
		type: String,
		required: true
	},

	uid:{
		type: String,
		unique: true,
		required: true
	},

	password: {
		type: String
	},
	
	provider: {
		type: String
	},

	avatar: {
		type: String,
		required: true
	},

	is_premium: {
		type: Boolean,
		default: false
	},

	created:{
		type: Date,
		default: Date.now
	}
});


schema
  .virtual('token')
  .get(function () {
    return this._id;
  });


schema.statics.findOrCreate = function(userObj, callBack) {
	var self = this;

	async.waterfall([
		function(callback) {

			 self.findOne({
  				uid: userObj.uid
  	 		}, function(err, user) {
  	 			if (err) throw err;

  	 			callback(null, user);
  	 		})

		},

		function(user, callback) {
			var newUser = new self(userObj);

			if (user) {
  				callback(null, user, false);
  			} else {

  				newUser.save(function(err, user) {
  					if (err) { throw err };
  					
					if(user) {
						callback(null, user, true);
					};

  				});

  			}
		}

	], function(err, user, is_create){
		callBack(user, is_create);
	});

};

schema.statics.findByUid = function(userObj, callBack) {
	var self = this;

	async.waterfall([
		function(callback) {

			 self.findOne({
  				uid: userObj.uid
  	 		}, function(err, user) {
  	 			if (err) throw err;

  	 			callback(null, user, false);
  	 		})

		}

	], function(err, user, is_create){

		callBack(user, is_create);
	});

};


if (!schema.options.toObject) schema.options.toObject = {};

schema.options.toObject.transform = function (doc, ret, options) {
  // remove the _id of every document before returning the result
  	delete ret._id;
  	delete ret.__v;
  	delete ret.password;

}

module.exports = mongoose.model("User", schema);





