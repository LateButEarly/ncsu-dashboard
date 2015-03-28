'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller'),
    comments = require('../../app/controllers/comments.server.controller');


module.exports = function(app) {
	// Article Routes
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);

	app.route('/articles/:articleId')
		.get(articles.read, comments.read)
		.put(users.requiresLogin, articles.hasAuthorization, articles.update)
		.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);
        //TODO: ARTICLES.DELETE FN SHOULD FIRST FIRE COMMENTS.REMOVE BY ARTICLE ID OF THE REQ.ARTICLE
        //THEN FINALLY IN THE CALLBACK OF THAT FN YOU CAN CALL ARTICLE.REMOVE BY ARTICLE ID OF THE REQ.ARTICLE
        //THEN IN THAT CALLBACK FINALLY ISSUE THE RESPONSE.

	// Finish by binding the article middleware
	app.param('articleId', articles.articleByID);
};
