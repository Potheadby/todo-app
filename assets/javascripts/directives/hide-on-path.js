'use strict';

/**
 * Directive that hides element on give path
 */

angular.module('Mashape-Todo').directive('hideOnRoute', function ($location) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return $location.path();
      }, function (newPath) {
        element.toggle(!(attrs.hideOnRoute === newPath));
      });
    }
  };
});