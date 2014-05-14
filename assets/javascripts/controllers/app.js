'use strict';

angular.module('Mashape-Todo').controller('AppCtrl', function ($scope, $timeout, Restangular) {
  var todos = Restangular.all('todo');

  $scope.page = 1;
  $scope.newTodo = '';
  $scope.editedTodo = null;
  $scope.todos = todos.getList().$object;

  $scope.query = '';

  $scope.updateList = function () {
    $scope.todos = todos.getList({
      page: $scope.page,
      q: $scope.query
    }).$object;
  };

  $scope.$watch('query', function (newValue, oldValue) {
    if (newValue === oldValue) return;
    if ($scope.searchTimeout) $timeout.cancel($scope.searchTimeout);

    $scope.searchTimeout = $timeout($scope.updateList, 250);
  });

  $scope.addTodo = function () {
    if (!$scope.newTodo) return;

    todos.post({ text: $scope.newTodo }).then(function (todo) {
      $scope.newTodo = '';

      if ($scope.todos.length >= 8) {
        $scope.todos.shift()
      }

      $scope.todos.push(todo);
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

      if (!$scope.todos.length) {
        $scope.updateList();
      }
    });
  };

  $scope.changePage = function (shift) {
    $scope.page += shift;
    $scope.updateList();
  };
});