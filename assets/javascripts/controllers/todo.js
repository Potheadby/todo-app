'use strict';

angular.module('Mashape-Todo').controller('TodoCtrl', function ($scope, $timeout, Restangular, searchQueryService) {
  var todos = Restangular.all('todo');

  $scope.editedTodo = null;
  $scope.query = '';

  /**
   * Watch search string change for updating todos list
   */

  $scope.$on('handleBroadcast', function () {
    $scope.query = searchQueryService.query;
  });

  /**
   * Fetch all todos
   */

  $scope.todos = todos.getList({ q: $scope.query }).$object;

  /**
   * Add todo and keep proper page size
   * @param todo - new todo item
   */

  $scope.addTodo = function (todo) {
    if (!todo) return;

    todos.post(todo).then(function (todo) {
      $scope.newTodo = '';
      $scope.todos.push(todo);
    });
  };

  /**
   * Edit todo item and save it or remove, if no title is specified
   * @param todo - item for editing
   */

  $scope.doneEditing = function (todo) {
    if (todo.markDeleted) return;

    $scope.editedTodo = null;

    if (!todo.title) {
      todo.markDeleted = true;
      $scope.destroyTodo(todo);
    } else {
      todo.save();
    }
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
  };

  /**
   * Remove todo item and keep proper page size
   * @param todo - item for editing
   */

  $scope.destroyTodo = function (todo) {
    todo.remove().then(function () {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    });
  };

  $scope.cancelEditing = function (todo) {
    if (todo.markDeleted) return;

    $scope.editedTodo = null;

    if (!todo.title) {
      todo.markDeleted = true;
      $scope.destroyTodo(todo);
    } else {
      todo.save();
    }
  };
});