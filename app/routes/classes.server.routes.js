'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var classes = require('../../app/controllers/classes.server.controller');

	// Classes Routes
	app.route('/classes')
		.get(classes.list)
		.post(users.requiresLogin, classes.create);

	app.route('/classes/:classId')
		.get(classes.read)
		.put(users.requiresLogin, classes.hasAuthorization, classes.update)
		.delete(users.requiresLogin, classes.hasAuthorization, classes.delete);

	// Finish by binding the Class middleware
	app.param('classId', classes.classByID);
};
