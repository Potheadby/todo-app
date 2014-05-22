'use strict';

angular.module('Mashape-Todo').controller('TodoCtrl', function ($scope, Restangular, searchQueryService, addTodoService) {
  var todos = Restangular.all('todo');

  /**
   * Fetch all todos from server
   */

  $scope.todos = todos.getList({ q: $scope.query || '' }).$object;

  /**
   * Watch search string change and update todos list
   */

  $scope.$on('handleBroadcast', function () {
    $scope.query = searchQueryService.query;
  });

  /**
   * Add new todo from broadcast event
   */

  $scope.$on('todoAdded', function () {
    todos.post(addTodoService.todo).then(function (todo) {
      $scope.todos.push(todo);
    });
  });

  /**
   * Edit todo item
   * @param todo - scope todo item
   */

  $scope.editTodo = function (todo) {
    todo.editing = true;
    $scope.tempTodo = angular.copy(todo.plain());
  };

  /**
   * Check for changes and update or destroy todo, hide editor form
   * @param todo - scope todo item
   */

  $scope.updateTodo = function (todo) {
    todo.editing = false;

    // Check for changes
    if (todo.title === $scope.tempTodo.title &&
        todo.body === $scope.tempTodo.body) {
      return;
    }

    if (!todo.title) {
      $scope.destroyTodo(todo);
    } else {
      todo.save();
    }
  };

  /**
   * Destory todo item
   * @param todo - scope todo item
   */

  $scope.destroyTodo = function (todo) {
    todo.remove().then(function () {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    });
  };

  /**
   * Reset changes in todo and hides editor form
   * @param todo - scope todo item
   */

  $scope.resetTodo = function (todo) {
    todo = $scope.todos[$scope.todos.indexOf(todo)];

    todo.title = $scope.tempTodo.title;
    todo.body = $scope.tempTodo.body;

    todo.editing = false;
  };
});