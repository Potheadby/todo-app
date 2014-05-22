/**
 * Service that broadcasts data to other controllers
 */

angular.module('Mashape-Todo').factory('transportService', function ($rootScope) {
  var transportService = {};

  transportService.msg = {};
  transportService.event = '';

  transportService.prepForBroadcast = function (msg, event) {
    this.msg = msg;
    this.event = event;

    this.broadcastItem();
  };

  transportService.broadcastItem = function () {
    $rootScope.$broadcast(this.event || 'handleBroadcast');
  };

  return transportService;
});