'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Notification = mongoose.model('Notification'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, notification;

/**
 * Notification routes tests
 */
describe('Notification CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Notification
		user.save(function() {
			notification = {
				name: 'Notification Name'
			};

			done();
		});
	});

	it('should be able to save Notification instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notification
				agent.post('/notifications')
					.send(notification)
					.expect(200)
					.end(function(notificationSaveErr, notificationSaveRes) {
						// Handle Notification save error
						if (notificationSaveErr) done(notificationSaveErr);

						// Get a list of Notifications
						agent.get('/notifications')
							.end(function(notificationsGetErr, notificationsGetRes) {
								// Handle Notification save error
								if (notificationsGetErr) done(notificationsGetErr);

								// Get Notifications list
								var notifications = notificationsGetRes.body;

								// Set assertions
								(notifications[0].user._id).should.equal(userId);
								(notifications[0].name).should.match('Notification Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Notification instance if not logged in', function(done) {
		agent.post('/notifications')
			.send(notification)
			.expect(401)
			.end(function(notificationSaveErr, notificationSaveRes) {
				// Call the assertion callback
				done(notificationSaveErr);
			});
	});

	it('should not be able to save Notification instance if no name is provided', function(done) {
		// Invalidate name field
		notification.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notification
				agent.post('/notifications')
					.send(notification)
					.expect(400)
					.end(function(notificationSaveErr, notificationSaveRes) {
						// Set message assertion
						(notificationSaveRes.body.message).should.match('Please fill Notification name');
						
						// Handle Notification save error
						done(notificationSaveErr);
					});
			});
	});

	it('should be able to update Notification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notification
				agent.post('/notifications')
					.send(notification)
					.expect(200)
					.end(function(notificationSaveErr, notificationSaveRes) {
						// Handle Notification save error
						if (notificationSaveErr) done(notificationSaveErr);

						// Update Notification name
						notification.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Notification
						agent.put('/notifications/' + notificationSaveRes.body._id)
							.send(notification)
							.expect(200)
							.end(function(notificationUpdateErr, notificationUpdateRes) {
								// Handle Notification update error
								if (notificationUpdateErr) done(notificationUpdateErr);

								// Set assertions
								(notificationUpdateRes.body._id).should.equal(notificationSaveRes.body._id);
								(notificationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Notifications if not signed in', function(done) {
		// Create new Notification model instance
		var notificationObj = new Notification(notification);

		// Save the Notification
		notificationObj.save(function() {
			// Request Notifications
			request(app).get('/notifications')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Notification if not signed in', function(done) {
		// Create new Notification model instance
		var notificationObj = new Notification(notification);

		// Save the Notification
		notificationObj.save(function() {
			request(app).get('/notifications/' + notificationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', notification.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Notification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Notification
				agent.post('/notifications')
					.send(notification)
					.expect(200)
					.end(function(notificationSaveErr, notificationSaveRes) {
						// Handle Notification save error
						if (notificationSaveErr) done(notificationSaveErr);

						// Delete existing Notification
						agent.delete('/notifications/' + notificationSaveRes.body._id)
							.send(notification)
							.expect(200)
							.end(function(notificationDeleteErr, notificationDeleteRes) {
								// Handle Notification error error
								if (notificationDeleteErr) done(notificationDeleteErr);

								// Set assertions
								(notificationDeleteRes.body._id).should.equal(notificationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Notification instance if not signed in', function(done) {
		// Set Notification user 
		notification.user = user;

		// Create new Notification model instance
		var notificationObj = new Notification(notification);

		// Save the Notification
		notificationObj.save(function() {
			// Try deleting Notification
			request(app).delete('/notifications/' + notificationObj._id)
			.expect(401)
			.end(function(notificationDeleteErr, notificationDeleteRes) {
				// Set message assertion
				(notificationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Notification error error
				done(notificationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Notification.remove().exec();
		done();
	});
});