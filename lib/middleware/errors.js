'use strict';

/**
 * Error handling middleware
 */

module.exports = function (err, req, res, next) {
  req.unhandledError = err;

  var message = err.message;
  var status = err.status || 500;

  console.error(err);

  res.json(status, { error: message });
};