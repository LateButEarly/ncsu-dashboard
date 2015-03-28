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
		required: 'Please fill in Course name.',
		trim: true
	},
    code: {
        type: String,
        default: '',
        required: 'Please fill in Course code.',
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: 'Please fill in Course description.',
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
    professor: {
        type: String,
        default: '',
        required: 'Please fill in Course professor.',
        trim: true
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
