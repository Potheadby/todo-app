'use strict';

/**
 * Directive that add class to current active link
 */

angular.module('Mashape-Todo').directive('activeLink', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var cls = attrs.activeLink;
      var path = attrs.href;

      scope.$watch(function () {
        return $location.path();
      }, function (newPath) {
        element.toggleClass(cls, path === newPath);
      });
    }
  };
});