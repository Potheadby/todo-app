'use strict';

var config = require('../config');
var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
var mongoose = require('mongoose-paginate');
var Todo = require('../models/todo');

var TodoController = {
  list: function (req, res, next) {
    var query = new RegExp(req.param('q'), 'i');
    var limit = req.param('limit') || 8;
    var page = req.param('page') || 1;

    Todo.paginate({
      text: query
    }, page, limit, function (err, total, todos) {
      if (err) return next(err);

      res.json({
        data: todos,
        total: total
      });
    }, { sortBy: { created: -1 }});
  },

  create: function (req, res, next) {
    new Todo(req.body).save(function (err, todo) {
      if (err) return next(err);

      return res.json(todo);
    });
  },

  read: function (req, res, next) {
    Todo.findOne({ _id: req.param('id') }).exec(function (err, todo) {
      if (err) return next(err);

      if (!todo) return next({ message: 'Todo not found', status: 404 });

      res.json(todo);
    });
  },

  update: function (req, res, next) {
    Todo.findOne({ _id: req.param('id') }).exec(function (err, todo) {
      if (err) return next(err);

      todo.text = req.param('text');
      todo.done = req.param('done');

      todo.save(function (err) {
        if (err) return next(err);

        if (todo.done) {
          console.log('SEND SMS');
          /* twilio.messages.create({
           body: 'Hello world',
           to: '+380951069726',
           from: config.twilio.number
           }, function (err, message) {
           console.log(err, message);

           res.json(message)
           });*/
        }

        res.json(todo);
      });
    });
  },

  destroy: function (req, res, next) {
    Todo.remove({ _id: req.param('id') }).exec(function (err, removed) {
      if (err) return next(err);

      if (removed === 0) {
        return next({ message: 'Nothing to remove', status: 400 });
      } else {
        res.send(200);
      }
    });
  }
};

module.exports = TodoController;