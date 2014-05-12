'use strict';

var config = require('../config');
var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
var Todo = require('../models/todo');

var TodoController = {
  list: function (req, res, next) {

  },

  find: function (req, res, next) {

  },

  create: function (req, res, next) {

  },

  read: function (req, res, next) {

  },

  update: function (req, res, next) {

  },

  destroy: function (req, res, next) {

  }
};

module.exports = TodoController;