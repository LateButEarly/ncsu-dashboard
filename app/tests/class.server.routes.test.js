'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Class = mongoose.model('Class'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, class;

/**
 * Class routes tests
 */
describe('Class CRUD tests', function() {
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

		// Save a user to the test db and create new Class
		user.save(function() {
			class = {
				name: 'Class Name'
			};

			done();
		});
	});

	it('should be able to save Class instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Class
				agent.post('/classes')
					.send(class)
					.expect(200)
					.end(function(classSaveErr, classSaveRes) {
						// Handle Class save error
						if (classSaveErr) done(classSaveErr);

						// Get a list of Classes
						agent.get('/classes')
							.end(function(classesGetErr, classesGetRes) {
								// Handle Class save error
								if (classesGetErr) done(classesGetErr);

								// Get Classes list
								var classes = classesGetRes.body;

								// Set assertions
								(classes[0].user._id).should.equal(userId);
								(classes[0].name).should.match('Class Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Class instance if not logged in', function(done) {
		agent.post('/classes')
			.send(class)
			.expect(401)
			.end(function(classSaveErr, classSaveRes) {
				// Call the assertion callback
				done(classSaveErr);
			});
	});

	it('should not be able to save Class instance if no name is provided', function(done) {
		// Invalidate name field
		class.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Class
				agent.post('/classes')
					.send(class)
					.expect(400)
					.end(function(classSaveErr, classSaveRes) {
						// Set message assertion
						(classSaveRes.body.message).should.match('Please fill Class name');
						
						// Handle Class save error
						done(classSaveErr);
					});
			});
	});

	it('should be able to update Class instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Class
				agent.post('/classes')
					.send(class)
					.expect(200)
					.end(function(classSaveErr, classSaveRes) {
						// Handle Class save error
						if (classSaveErr) done(classSaveErr);

						// Update Class name
						class.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Class
						agent.put('/classes/' + classSaveRes.body._id)
							.send(class)
							.expect(200)
							.end(function(classUpdateErr, classUpdateRes) {
								// Handle Class update error
								if (classUpdateErr) done(classUpdateErr);

								// Set assertions
								(classUpdateRes.body._id).should.equal(classSaveRes.body._id);
								(classUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Classes if not signed in', function(done) {
		// Create new Class model instance
		var classObj = new Class(class);

		// Save the Class
		classObj.save(function() {
			// Request Classes
			request(app).get('/classes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Class if not signed in', function(done) {
		// Create new Class model instance
		var classObj = new Class(class);

		// Save the Class
		classObj.save(function() {
			request(app).get('/classes/' + classObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', class.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Class instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Class
				agent.post('/classes')
					.send(class)
					.expect(200)
					.end(function(classSaveErr, classSaveRes) {
						// Handle Class save error
						if (classSaveErr) done(classSaveErr);

						// Delete existing Class
						agent.delete('/classes/' + classSaveRes.body._id)
							.send(class)
							.expect(200)
							.end(function(classDeleteErr, classDeleteRes) {
								// Handle Class error error
								if (classDeleteErr) done(classDeleteErr);

								// Set assertions
								(classDeleteRes.body._id).should.equal(classSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Class instance if not signed in', function(done) {
		// Set Class user 
		class.user = user;

		// Create new Class model instance
		var classObj = new Class(class);

		// Save the Class
		classObj.save(function() {
			// Try deleting Class
			request(app).delete('/classes/' + classObj._id)
			.expect(401)
			.end(function(classDeleteErr, classDeleteRes) {
				// Set message assertion
				(classDeleteRes.body.message).should.match('User is not logged in');

				// Handle Class error error
				done(classDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Class.remove().exec();
		done();
	});
});