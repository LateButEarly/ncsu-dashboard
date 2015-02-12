'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Course Schema
 */
var CourseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Course name',
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
    /*
    students: {
        type: Schema.ObjectID,
        ref: 'User'
    }
    */
});
/* TODO: Accept array of students from list.. ng-model -> explode students */
mongoose.model('Course', CourseSchema);
