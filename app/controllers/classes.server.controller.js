'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Class = mongoose.model('Class'),
	_ = require('lodash');

/**
 * Create a Class
 */
exports.create = function(req, res) {
	var class = new Class(req.body);
	class.user = req.user;

	class.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(class);
		}
	});
};

/**
 * Show the current Class
 */
exports.read = function(req, res) {
	res.jsonp(req.class);
};

/**
 * Update a Class
 */
exports.update = function(req, res) {
	var class = req.class ;

	class = _.extend(class , req.body);

	class.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(class);
		}
	});
};

/**
 * Delete an Class
 */
exports.delete = function(req, res) {
	var class = req.class ;

	class.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(class);
		}
	});
};

/**
 * List of Classes
 */
exports.list = function(req, res) { 
	Class.find().sort('-created').populate('user', 'displayName').exec(function(err, classes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(classes);
		}
	});
};

/**
 * Class middleware
 */
exports.classByID = function(req, res, next, id) { 
	Class.findById(id).populate('user', 'displayName').exec(function(err, class) {
		if (err) return next(err);
		if (! class) return next(new Error('Failed to load Class ' + id));
		req.class = class ;
		next();
	});
};

/**
 * Class authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.class.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
