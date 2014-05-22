'use strict';

angular.module('Mashape-Todo').controller('TodoCtrl', function ($scope, Restangular, searchQueryService, addTodoService) {
  var todos = Restangular.all('todo');

  /**
   * Fetch all todos
   */

  $scope.todos = todos.getList({ q: $scope.query || '' }).$object;

  /**
   * Watch search string change for updating list
   */

  $scope.$on('handleBroadcast', function () {
    $scope.query = searchQueryService.query;
  });

  /**
   * Add new item from broadcast event
   */

  $scope.$on('todoAdded', function () {
    todos.post(addTodoService.todo).then(function (todo) {
      $scope.todos.push(todo);
    });
  });

  $scope.editTodo = function (todo) {
    todo.editing = true;
  }

});