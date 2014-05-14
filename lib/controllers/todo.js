'use strict';

var config = require('../config');
var twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
var mongoose = require('mongoose-paginate');
var Todo = require('../models/todo');

var TodoController = {
  /**
   * Returns todo items list
   * @param q - search query
   * @param limit - items number per page
   * @param page - current page number
   */

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
        page: page,
        total: total
      });
    }, { sortBy: { created: -1 }});
  },

  /**
   * Creates new todo item and returns it
   * @param todo - todo object
   */

  create: function (req, res, next) {
    new Todo({ text: req.param('text') }).save(function (err, todo) {
      if (err) return next(err);

      return res.json(todo);
    });
  },

  /**
   * Returns single todo item
   * @param _id - todo item id
   */

  read: function (req, res, next) {
    Todo.findOne({ _id: req.param('id') }).exec(function (err, todo) {
      if (err) return next(err);

      if (!todo) return next({ message: 'Todo not found or id is invalid', status: 404 });

      res.json(todo);
    });
  },

  /**
   * Updates todo item
   * @param todo - todo object
   */

  update: function (req, res, next) {
    Todo.findOne({ _id: req.param('id') }).exec(function (err, todo) {
      if (err) return next(err);

      if (!todo) return next({ message: 'Todo not found or id is invalid', status: 404 });

      var phone = req.param('phone');

      todo.text = req.param('text');
      todo.done = req.param('done');

      todo.save(function (err) {
        if (err) return next(err);

        if (todo.done && phone) {
          twilio.messages.create({
            body: '"' + todo.text + '" task has been marked as done.',
            to: phone,
            from: config.twilio.number
          }, function (err) {
            if (err) return next(err);
          });
        }

        res.json(todo);
      });
    });
  },

  /**
   * Destroys single todo item
   * @param _id - todo item id
   */

  destroy: function (req, res, next) {
    Todo.remove({ _id: req.param('id') }).exec(function (err, removed) {
      if (err) return next(err);

      if (removed === 0) {
        return next({ message: 'Todo not found or id is invalid', status: 400 });
      } else {
        res.send(200);
      }
    });
  }
};

module.exports = TodoController;