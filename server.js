'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var routes = require('./lib/routes');

/**
 * Load middleware.
 */

var errors = require('./lib/middleware/errors.js');

/**
 * Configs.
 */

var config = require('./lib/config');

/**
 * Create Express server.
 */

var app = express();

/**
 * Mongoose configuration.
 */

mongoose.connect(config.db);
mongoose.connection.on('error', function () {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

/**
 * Express configuration.
 */

var hour = 3600000;
var day = (hour * 24);
var week = (day * 7);
var month = (day * 30);

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.set('json spaces', 0);
app.use(express.urlencoded());
app.use(express.compress());
app.use(express.methodOverride());
app.use('/', express.static(path.join(__dirname, 'lib', 'public'), { maxAge: week }));
app.use(app.router);

/**
 * Errors middleware
 */

app.use(errors);

/**
 * Application routes.
 */

routes(app);

/**
 * Start Express server.
 */

app.listen(app.get('port'), function () {
  console.log('✔ Express server listening on port %d in %s mode', app.get('port'), app.settings.env);
});
