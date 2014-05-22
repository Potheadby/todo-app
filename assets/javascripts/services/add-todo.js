/**
 * Service that broadcasts new todo item to other controllers
 */

angular.module('Mashape-Todo').factory('addTodoService', function ($rootScope) {
  var addTodoService = {};

  addTodoService.query = '';

  addTodoService.prepForBroadcast = function (msg) {
    this.todo = msg;
    this.broadcastItem();
  };

  addTodoService.broadcastItem = function () {
    $rootScope.$broadcast('todoAdded');
  };

  return addTodoService;
});