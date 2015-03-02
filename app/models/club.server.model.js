'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Club Schema
 */
var ClubSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill in the Club name.',
		trim: true
	},
    image: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    notifications: {
        type: Array,
        default: '',
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
    admin: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Club', ClubSchema);
