'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var clubs = require('../../app/controllers/clubs.server.controller');

	// Clubs Routes
	app.route('/clubs')
		.get(clubs.list)
		.post(users.requiresLogin, clubs.create);

	app.route('/clubs/:clubId')
		.get(clubs.read)
		.put(users.requiresLogin, clubs.hasAuthorization, clubs.update)
		.delete(users.requiresLogin, clubs.hasAuthorization, clubs.delete);

	// Finish by binding the Club middleware
	app.param('clubId', clubs.clubByID);
};
