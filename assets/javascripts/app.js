'use strict';

var app = angular.module('Mashape-Todo', [
  'ngRoute',
  'restangular'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider) {
  RestangularProvider
      .setBaseUrl('/api/v1')
      .setRestangularFields({ id: '_id' });

  $routeProvider
      .when('/:id?', {
        templateUrl: '/app.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  $locationProvider.html5Mode(true);
});

app.run();

