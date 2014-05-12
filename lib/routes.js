'use strict';

var path = require('path');
var todoController = require('./controllers/todo');

module.exports = function (app) {
  /**
   * Todo routes.
   */

  app.get('/api/v1/todo', todoController.list);
  app.post('/api/v1/todo', todoController.create);
  app.get('/api/v1/todo/:id', todoController.read);
  app.put('/api/v1/todo/:id', todoController.update);
  app.del('/api/v1/todo/:id', todoController.destroy);

  /**
   * Callback if method not found.
   */

  app.all('/api*', function (req, res, next) {
    return next({ message: 'API method not found.', status: 400 });
  });

  app.get('/*', function (req, res) {
    res.sendfile(path.join(__dirname, 'public', 'layout.html'));
  });
};