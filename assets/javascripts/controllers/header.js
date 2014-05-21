'use strict';

angular.module('Mashape-Todo').controller('HeaderCtrl', function ($scope, $timeout, searchQueryService) {
  /**
   * Watch search string change and broadcast query
   */

  $scope.$watch('query', function (newValue, oldValue) {
    if (newValue === oldValue) return; // Prevent non change trigger

    if ($scope.searchTimeout) $timeout.cancel($scope.searchTimeout);

    $scope.searchTimeout = $timeout(function () {
      searchQueryService.prepForBroadcast(newValue);
    }, 250);
  });
});