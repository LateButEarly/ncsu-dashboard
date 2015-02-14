'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Notification = mongoose.model('Notification'),
	_ = require('lodash');

/**
 * Create a Notification
 */
exports.create = function(req, res) {
	var notification = new Notification(req.body);
	notification.user = req.user;

	notification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notification);
		}
	});
};

/**
 * Show the current Notification
 */
exports.read = function(req, res) {
	res.jsonp(req.notification);
};

/**
 * Update a Notification
 */
exports.update = function(req, res) {
	var notification = req.notification ;

	notification = _.extend(notification , req.body);

	notification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notification);
		}
	});
};

/**
 * Delete an Notification
 */
exports.delete = function(req, res) {
	var notification = req.notification ;

	notification.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notification);
		}
	});
};

/**
 * List of Notifications
 */
exports.list = function(req, res) { 
	Notification.find().sort('-created').populate('user', 'displayName').exec(function(err, notifications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(notifications);
		}
	});
};

/**
 * Notification middleware
 */
exports.notificationByID = function(req, res, next, id) { 
	Notification.findById(id).populate('user', 'displayName').exec(function(err, notification) {
		if (err) return next(err);
		if (! notification) return next(new Error('Failed to load Notification ' + id));
		req.notification = notification ;
		next();
	});
};

/**
 * Notification authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.notification.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
