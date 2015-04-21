'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Assignment Schema
 */
var AssignmentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Assignment name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Assignment', AssignmentSchema);