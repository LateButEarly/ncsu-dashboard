'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Assignment = mongoose.model('Assignment'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, assignment;

/**
 * Assignment routes tests
 */
describe('Assignment CRUD tests', function() {
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

		// Save a user to the test db and create new Assignment
		user.save(function() {
			assignment = {
				name: 'Assignment Name'
			};

			done();
		});
	});

	it('should be able to save Assignment instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assignment
				agent.post('/assignments')
					.send(assignment)
					.expect(200)
					.end(function(assignmentSaveErr, assignmentSaveRes) {
						// Handle Assignment save error
						if (assignmentSaveErr) done(assignmentSaveErr);

						// Get a list of Assignments
						agent.get('/assignments')
							.end(function(assignmentsGetErr, assignmentsGetRes) {
								// Handle Assignment save error
								if (assignmentsGetErr) done(assignmentsGetErr);

								// Get Assignments list
								var assignments = assignmentsGetRes.body;

								// Set assertions
								(assignments[0].user._id).should.equal(userId);
								(assignments[0].name).should.match('Assignment Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Assignment instance if not logged in', function(done) {
		agent.post('/assignments')
			.send(assignment)
			.expect(401)
			.end(function(assignmentSaveErr, assignmentSaveRes) {
				// Call the assertion callback
				done(assignmentSaveErr);
			});
	});

	it('should not be able to save Assignment instance if no name is provided', function(done) {
		// Invalidate name field
		assignment.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assignment
				agent.post('/assignments')
					.send(assignment)
					.expect(400)
					.end(function(assignmentSaveErr, assignmentSaveRes) {
						// Set message assertion
						(assignmentSaveRes.body.message).should.match('Please fill Assignment name');
						
						// Handle Assignment save error
						done(assignmentSaveErr);
					});
			});
	});

	it('should be able to update Assignment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assignment
				agent.post('/assignments')
					.send(assignment)
					.expect(200)
					.end(function(assignmentSaveErr, assignmentSaveRes) {
						// Handle Assignment save error
						if (assignmentSaveErr) done(assignmentSaveErr);

						// Update Assignment name
						assignment.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Assignment
						agent.put('/assignments/' + assignmentSaveRes.body._id)
							.send(assignment)
							.expect(200)
							.end(function(assignmentUpdateErr, assignmentUpdateRes) {
								// Handle Assignment update error
								if (assignmentUpdateErr) done(assignmentUpdateErr);

								// Set assertions
								(assignmentUpdateRes.body._id).should.equal(assignmentSaveRes.body._id);
								(assignmentUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Assignments if not signed in', function(done) {
		// Create new Assignment model instance
		var assignmentObj = new Assignment(assignment);

		// Save the Assignment
		assignmentObj.save(function() {
			// Request Assignments
			request(app).get('/assignments')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Assignment if not signed in', function(done) {
		// Create new Assignment model instance
		var assignmentObj = new Assignment(assignment);

		// Save the Assignment
		assignmentObj.save(function() {
			request(app).get('/assignments/' + assignmentObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', assignment.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Assignment instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Assignment
				agent.post('/assignments')
					.send(assignment)
					.expect(200)
					.end(function(assignmentSaveErr, assignmentSaveRes) {
						// Handle Assignment save error
						if (assignmentSaveErr) done(assignmentSaveErr);

						// Delete existing Assignment
						agent.delete('/assignments/' + assignmentSaveRes.body._id)
							.send(assignment)
							.expect(200)
							.end(function(assignmentDeleteErr, assignmentDeleteRes) {
								// Handle Assignment error error
								if (assignmentDeleteErr) done(assignmentDeleteErr);

								// Set assertions
								(assignmentDeleteRes.body._id).should.equal(assignmentSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Assignment instance if not signed in', function(done) {
		// Set Assignment user 
		assignment.user = user;

		// Create new Assignment model instance
		var assignmentObj = new Assignment(assignment);

		// Save the Assignment
		assignmentObj.save(function() {
			// Try deleting Assignment
			request(app).delete('/assignments/' + assignmentObj._id)
			.expect(401)
			.end(function(assignmentDeleteErr, assignmentDeleteRes) {
				// Set message assertion
				(assignmentDeleteRes.body.message).should.match('User is not logged in');

				// Handle Assignment error error
				done(assignmentDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Assignment.remove().exec();
		done();
	});
});