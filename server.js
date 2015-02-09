'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

// Twilio SMS Notification
/*
 var accountSid = 'AC35bcc6b076419c037a465463ea23f942',
 authToken = '1dcfaa7d4151e6774dbf6ea6fb2faba4',
 client = require('twilio')(accountSid, authToken);

 function checkReminders () {
 var promise = client.messages.create({
 to: '+19194413402', // a number to call
 from: '+19196705363', // a Twilio number you own
 body: 'test click'
 });

 promise.then(function (call) {
 console.log('Call success! Call SID: ' + call.sid);
 }, function (error) {
 console.error('Call failed! Reasons: ' + error.message);
 });
 }
 */
