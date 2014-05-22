'use strict';

angular.module('Mashape-Todo').controller('HeaderCtrl', function ($scope, transportService) {
  /**
   * Watch search string change and broadcast query
   */

  $scope.$watch('query', function (newValue, oldValue) {
    if (newValue === oldValue) return;
    transportService.prepForBroadcast(newValue, 'queryUpdated');
  });
});