'use strict';

module.exports = {
  db: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      'mongodb://localhost/mashape_todo_app',

  twilio: {
    accountSid: 'AC4f914ff62827e332424d928833fb23aa',
    authToken: 'b05b2d72dac413439a571e448705a23f',
    number: '+17178509456'
  }
};
