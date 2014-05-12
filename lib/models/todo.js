'use strict';

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  body: String,
  done: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);