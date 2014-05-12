'use strict';

angular.module('Mashape-Todo').controller('AppCtrl', function ($scope, Restangular) {
  var todos = Restangular.all('todo');

  $scope.newTodo = {};
  $scope.todos = todos.getList().$object;

  $scope.addTodo = function () {
    var newTodo = $scope.newTodo;

    for (var field in newTodo) {
      if (newTodo.hasOwnProperty(field)) {
        newTodo[field] = newTodo[field].trim();
      }
    }

    if (!newTodo.title.length) return;

    todos.post(newTodo).then(function (todo) {
      $scope.newTodo = {};
      $scope.todos.push(todo)
    });
  };

  $scope.editTodo = function (todo) {
    todo.save();
  };

  $scope.destroyTodo = function (todo) {
    todo.remove().then(function () {
      $scope.todos.splice($scope.todos.indexOf(todo), 1);
    });
  };
});