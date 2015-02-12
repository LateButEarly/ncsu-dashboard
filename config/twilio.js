'use strict';

/**
 * Module dependencies.
 */

//var twilio = require('./node_modules/twilio/lib');

/**
 * Module init function.
 */
/*
module.exports = function() {
    //var client = new twilio.RestClient('AC35bcc6b076419c037a465463ea23f942', '1dcfaa7d4151e6774dbf6ea6fb2faba4');
    var accountSid = 'AC35bcc6b076419c037a465463ea23f942',
        authToken = '1dcfaa7d4151e6774dbf6ea6fb2faba4',
        client = require('twilio')(accountSid, authToken);

    //iterate over all assignments and check if assignment due date is within 12 hours of nowDate()
    //if true, fire text message and set alreadyReminded to true else, repeat every 30 minutes.
   function checkReminders () {
       var promise = client.messages.create({
           to:'+19194413402', // a number to call
           from:'+19196705363', // a Twilio number you own
           body: 'testing testing'
       });

       promise.then(function(call){
           console.log('Call success! Call SID: '+call.sid);
       }, function(error) {
           console.error('Call failed! Reasons: '+error.message);
       });
   }

    setInterval(checkReminders, 60000);
    checkReminders();
};
*/
