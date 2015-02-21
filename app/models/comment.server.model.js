'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	body: {
		type: String,
		default: '',
		required: 'Please fill Comment body.',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    article: {
        type: Schema.ObjectId,
        ref: 'Article'
    }
});

mongoose.model('Comment', CommentSchema);
