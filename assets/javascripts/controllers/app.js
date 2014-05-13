'use strict';

angular.module('Mashape-Todo').controller('AppCtrl', function ($scope, Restangular) {
  var todos = Restangular.all('todo');

  $scope.newTodo = '';
  $scope.editedTodo = null;
  $scope.todos = todos.getList().$object;

  $scope.addTodo = function () {
    if (!$scope.newTodo.length) return;

    todos.post({ text: $scope.newTodo }).then(function (todo) {
      $scope.newTodo = '';
      $scope.todos.push(todo)
    });
  };

  $scope.doneEditing = function (todo) {
    if (todo.markDeleted) return;

    $scope.editedTodo = null;

    if (!todo.text) {
      todo.markDeleted = true;
      $scope.destroyTodo(todo);
    } else {
      todo.save();
    }
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
  };

  $scope.destroyTodo = function (todo) {
    todo.remove().then(function () {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    });
  };

  $scope.doSearch = function () {
    if ($scope.query) {
      $scope.todos = todos.getList({q: $scope.query}).$object;
    }
  }
});