'use strict';

/**
 * Error handling middleware
 */

module.exports = function (err, req, res) {
  req.unhandledError = err;

  var message = err.message;
  var status = err.status || 500;

  // Catch mongo validation errors
  if (err.errors) {
    message = [];

    for (var field in err.errors) {
      var errObj = {};

      errObj[field] = err.errors[field].message;
      message.push(errObj);
    }
  }

  console.error(err);

  res.json({ error: message }, status);
};