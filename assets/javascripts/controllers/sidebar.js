'use strict';

angular.module('Mashape-Todo').controller('SidebarCtrl', function ($scope, addTodoService) {
  /**
   * Broadcast new todo item
   */

  $scope.addTodo = function () {
    if (!$scope.newTodo) return;

    addTodoService.prepForBroadcast($scope.newTodo);
    $scope.newTodo = {};
  };

  $scope.reset = function () {
    $scope.newTodo = {};
  };
});