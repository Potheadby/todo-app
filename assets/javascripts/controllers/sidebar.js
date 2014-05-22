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

  /**
   * Reset and hide form
   */

  $scope.reset = function () {
    $scope.newTodo = {};
  };
});