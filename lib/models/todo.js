'use strict';

var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  body: String,
  done: Boolean,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);