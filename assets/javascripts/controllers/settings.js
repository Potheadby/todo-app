'use strict';

angular.module('Mashape-Todo').controller('SettingsCtrl', function ($scope, Restangular, localStorageService) {
  $scope.phone = localStorageService.get('phone');

  $scope.submit = function () {
    if ($scope.phone) {
      localStorageService.set('phone', $scope.phone);
      Restangular.setDefaultHeaders({ 'x-phone': $scope.phone });
    }
  };
});