'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Article = mongoose.model('Article'),
    Comment = mongoose.model('Comment'),
	_ = require('lodash');


/**
 * Create an article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Create a comment
 */
exports.createComment = function(req, res) {
    var article = req.article;
    var comment = new Comment(req.body);

    article.comment = req.comment;

    comment.article = req.article;
    comment.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
            res.jsonp(comment);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
    res.json(req.comment);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find()
        .sort('-created')
        .populate('user', 'displayName')
        .exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 * .populate passes data into the view - http://mongoosejs.com/docs/populate.html
 */
exports.articleByID = function(req, res, next, id) {
	Article.findById(id)
        .populate('user', 'displayName')
        .exec(function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article;
		next();
	});
};

exports.articleComments = function(req, res, next, id) {
    Article.find()
        .populate('comments')
        .exec(function(err, articles) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(req.article);
            }
        });
};

/**
 * Only show Articles by user.
 * @param req
 * @param res
 * @param next
 * @param id
 */
exports.articleListByUser = function(req, res, next, id) {
    Article
        .find({ user: req.user.id})
        .sort('-created')
        .populate('user', 'displayName')
        .exec(function(err, article) {

            if (err) return next(err);
            if (!article) return next(new Error('Failed to load article ' + id));
            req.article = article;
            next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    /*
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	*/
	next();
};
