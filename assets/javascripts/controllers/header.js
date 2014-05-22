'use strict';

angular.module('Mashape-Todo').controller('HeaderCtrl', function ($scope, searchQueryService) {
  /**
   * Watch search string change and broadcast query
   */

  $scope.$watch('query', function (newValue, oldValue) {
    if (newValue === oldValue) return;
    searchQueryService.prepForBroadcast(newValue);
  });
});