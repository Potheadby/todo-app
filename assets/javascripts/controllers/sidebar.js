'use strict';

angular.module('Mashape-Todo').controller('SidebarCtrl', function ($scope, transportService) {
  /**
   * Broadcast new todo item
   */

  $scope.addTodo = function () {
    if (!$scope.newTodo) return;

    transportService.prepForBroadcast($scope.newTodo, 'todoAdded');
    $scope.newTodo = {};
  };

  $scope.reset = function () {
    $scope.newTodo = {};
  };
});