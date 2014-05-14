'use strict';

var app = angular.module('Mashape-Todo', [
  'ngRoute',
  'restangular'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider) {
  /**
   * Restangular initial config
   */

  RestangularProvider
      .setBaseUrl('/api/v1')
      .setRestangularFields({ id: '_id' })
      .addResponseInterceptor(function (data, operation) {
        var extractedData;

        if (operation === 'getList') {
          extractedData = data.data;
          extractedData.total = data.total;
          extractedData.page = data.page;
        } else {
          extractedData = data;
        }

        return extractedData;
      });

  $locationProvider.html5Mode(true);

  $routeProvider
      .when('/:phone?', {
        templateUrl: '/app.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

app.run();

