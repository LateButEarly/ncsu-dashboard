'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Notification Schema
 */
var NotificationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Notification name',
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
    isShowing: {
        type: Boolean,
        default: true
    }
});

mongoose.model('Notification', NotificationSchema);
