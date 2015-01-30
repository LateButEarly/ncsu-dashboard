'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Class Schema
 */
var ClassSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Class name',
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

mongoose.model('Class', ClassSchema);