'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Club = mongoose.model('Club'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, club;

/**
 * Club routes tests
 */
describe('Club CRUD tests', function() {
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

		// Save a user to the test db and create new Club
		user.save(function() {
			club = {
				name: 'Club Name'
			};

			done();
		});
	});

	it('should be able to save Club instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Club
				agent.post('/clubs')
					.send(club)
					.expect(200)
					.end(function(clubSaveErr, clubSaveRes) {
						// Handle Club save error
						if (clubSaveErr) done(clubSaveErr);

						// Get a list of Clubs
						agent.get('/clubs')
							.end(function(clubsGetErr, clubsGetRes) {
								// Handle Club save error
								if (clubsGetErr) done(clubsGetErr);

								// Get Clubs list
								var clubs = clubsGetRes.body;

								// Set assertions
								(clubs[0].user._id).should.equal(userId);
								(clubs[0].name).should.match('Club Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Club instance if not logged in', function(done) {
		agent.post('/clubs')
			.send(club)
			.expect(401)
			.end(function(clubSaveErr, clubSaveRes) {
				// Call the assertion callback
				done(clubSaveErr);
			});
	});

	it('should not be able to save Club instance if no name is provided', function(done) {
		// Invalidate name field
		club.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Club
				agent.post('/clubs')
					.send(club)
					.expect(400)
					.end(function(clubSaveErr, clubSaveRes) {
						// Set message assertion
						(clubSaveRes.body.message).should.match('Please fill Club name');
						
						// Handle Club save error
						done(clubSaveErr);
					});
			});
	});

	it('should be able to update Club instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Club
				agent.post('/clubs')
					.send(club)
					.expect(200)
					.end(function(clubSaveErr, clubSaveRes) {
						// Handle Club save error
						if (clubSaveErr) done(clubSaveErr);

						// Update Club name
						club.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Club
						agent.put('/clubs/' + clubSaveRes.body._id)
							.send(club)
							.expect(200)
							.end(function(clubUpdateErr, clubUpdateRes) {
								// Handle Club update error
								if (clubUpdateErr) done(clubUpdateErr);

								// Set assertions
								(clubUpdateRes.body._id).should.equal(clubSaveRes.body._id);
								(clubUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Clubs if not signed in', function(done) {
		// Create new Club model instance
		var clubObj = new Club(club);

		// Save the Club
		clubObj.save(function() {
			// Request Clubs
			request(app).get('/clubs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Club if not signed in', function(done) {
		// Create new Club model instance
		var clubObj = new Club(club);

		// Save the Club
		clubObj.save(function() {
			request(app).get('/clubs/' + clubObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', club.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Club instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Club
				agent.post('/clubs')
					.send(club)
					.expect(200)
					.end(function(clubSaveErr, clubSaveRes) {
						// Handle Club save error
						if (clubSaveErr) done(clubSaveErr);

						// Delete existing Club
						agent.delete('/clubs/' + clubSaveRes.body._id)
							.send(club)
							.expect(200)
							.end(function(clubDeleteErr, clubDeleteRes) {
								// Handle Club error error
								if (clubDeleteErr) done(clubDeleteErr);

								// Set assertions
								(clubDeleteRes.body._id).should.equal(clubSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Club instance if not signed in', function(done) {
		// Set Club user 
		club.user = user;

		// Create new Club model instance
		var clubObj = new Club(club);

		// Save the Club
		clubObj.save(function() {
			// Try deleting Club
			request(app).delete('/clubs/' + clubObj._id)
			.expect(401)
			.end(function(clubDeleteErr, clubDeleteRes) {
				// Set message assertion
				(clubDeleteRes.body.message).should.match('User is not logged in');

				// Handle Club error error
				done(clubDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Club.remove().exec();
		done();
	});
});