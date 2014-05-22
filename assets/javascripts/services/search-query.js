/**
 * Service that broadcasts search query to other controllers
 */

angular.module('Mashape-Todo').factory('searchQueryService', function ($rootScope) {
  var searchQueryService = {};

  searchQueryService.query = '';

  searchQueryService.prepForBroadcast = function (msg) {
    this.query = msg;
    this.broadcastItem();
  };

  searchQueryService.broadcastItem = function () {
    $rootScope.$broadcast('handleBroadcast');
  };

  return searchQueryService;
});