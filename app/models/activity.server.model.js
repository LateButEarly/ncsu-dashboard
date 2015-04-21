'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Activity name',
		trim: true
	},
    overview: {
        type: String,
        default: '',
        required: 'Please fill Activity overview',
        trim: true
    },
    date: {
        type: String,
        default: 'mm/dd/yyyy',
        required: 'Please fill Activity date',
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

mongoose.model('Activity', ActivitySchema);
