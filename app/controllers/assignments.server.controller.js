'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Assignment = mongoose.model('Assignment'),
	_ = require('lodash');

/**
 * Create a Assignment
 */
exports.create = function(req, res) {
	var assignment = new Assignment(req.body);
	assignment.user = req.user;

	assignment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};

/**
 * Show the current Assignment
 */
exports.read = function(req, res) {
	res.jsonp(req.assignment);
};

/**
 * Update a Assignment
 */
exports.update = function(req, res) {
	var assignment = req.assignment ;

	assignment = _.extend(assignment , req.body);

	assignment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};

/**
 * Delete an Assignment
 */
exports.delete = function(req, res) {
	var assignment = req.assignment ;

	assignment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignment);
		}
	});
};

/**
 * List of Assignments
 */
exports.list = function(req, res) { 
	Assignment.find().sort('-created').populate('user', 'displayName').exec(function(err, assignments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(assignments);
		}
	});
};

/**
 * Assignment middleware
 */
exports.assignmentByID = function(req, res, next, id) { 
	Assignment.findById(id).populate('user', 'displayName').exec(function(err, assignment) {
		if (err) return next(err);
		if (! assignment) return next(new Error('Failed to load Assignment ' + id));
		req.assignment = assignment ;
		next();
	});
};

/**
 * Assignment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.assignment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
