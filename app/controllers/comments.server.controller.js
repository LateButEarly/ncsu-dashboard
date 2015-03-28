'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Comment = mongoose.model('Comment'),
    Article = mongoose.model('Article'),
    User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Comment
 */
exports.create = function(req, res) {
    var comment = new Comment(req.body);

    comment.article = req.article;
    console.log('req.article: ' + comment.article );

    comment.user = req.user;
    console.log('req.user: '+ comment.user);

    comment.save(function(err,comment){
        if (err) return res.status(400).send({ message: errorHandler.getErrorMessage(err) });

        //push comment id to articles comments array
        Article.findByIdAndUpdate(
            comment.article,
            {'$push': {comments : {'_id' : comment._id } } },
        function(err,article){
                article.save();
            },
            console.log('article saved via comment.server.controller\nComment ID: ' + comment + '\nArticle ID: ' + comment.article)
        );

        User.findByIdAndUpdate(
            comment.user,
            {'$push': {comments: {'_id': comment._id}}},
            {safe:true},
            console.log('user updated via comment.server.controller')
        );

        res.json(comment);

    });

};

/**
 * Show the current Comment
 */
exports.read = function(req, res) {
	res.jsonp(req.comment);
};

/**
 * Update a Comment
 */
exports.update = function(req, res) {
	var comment = req.comment ;

	comment = _.extend(comment , req.body);

	comment.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * Delete an Comment
 */
exports.delete = function(req, res) {
	var comment = req.comment ;

	comment.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comment);
		}
	});
};

/**
 * List of Comments
 */
exports.list = function(req, res) { 
	Comment.find().sort('-created').populate('user', 'displayName').exec(function(err, comments) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(comments);
		}
	});
};

/**
 * Comment middleware
 */
exports.commentByID = function(req, res, next, id) { 
	Comment.findById(id).populate('user', 'displayName').exec(function(err, comment) {
		if (err) return next(err);
		if (! comment) return next(new Error('Failed to load Comment ' + id));
		req.comment = comment ;
		next();
	});
};

/**
 * Comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.comment.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
