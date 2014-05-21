'use strict';

var app = angular.module('Mashape-Todo', [
  'ngRoute',
  'restangular',
  'LocalStorageModule',
  'ngProgressLite'
]);

app.config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider, localStorageServiceProvider) {
  /**
   * Restangular initial config
   */

  RestangularProvider
      .setBaseUrl('/api/v1')
      .setRestangularFields({ id: '_id' });

  $locationProvider.html5Mode(true);

  $routeProvider
      .when('/', {
        templateUrl: '/todo.html',
        controller: 'TodoCtrl'
      })
      .when('/settings', {
        templateUrl: '/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});

app.run(function (localStorageService, Restangular, ngProgressLite) {
  /**
   * Set http header with mobile phone from URL and
   * show preloader on rest requests
   */

  var userPhone = localStorageService.get('phone');

  if (userPhone) {
    Restangular.setDefaultHeaders({ 'x-phone': userPhone });
  }

  Restangular
      .addRequestInterceptor(function (elem) {
        ngProgressLite.start();

        return elem;
      })
      .addResponseInterceptor(function (data) {
        ngProgressLite.done();

        return data;
      });
});

