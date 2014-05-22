'use strict';

angular.module('Mashape-Todo').controller('SettingsCtrl', function ($scope, Restangular, localStorageService) {
  var cachedPhone = localStorageService.get('phone');

  $scope.phone = cachedPhone;

  /**
   * Save user phone to localStorage and
   * update Restangular HTTP header
   */

  $scope.submit = function () {
    if ($scope.phone && $scope.phone !== cachedPhone) {
      localStorageService.set('phone', $scope.phone);
      Restangular.setDefaultHeaders({ 'x-phone': $scope.phone });

      $scope.phoneUpdated = true;
    } else {
      $scope.phoneUpdated = false;
    }
  };
});