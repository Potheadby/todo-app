'use strict';

/**
 * Directive that toggles dropdonws
 */

angular.module('Mashape-Todo').directive('dropdown', function ($document) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.toggleDropdown = function (visible) {
        element.toggleClass(attrs.dropdownToggleClass || 'open', visible);
      };

      element.on('click', function () {
        scope.toggleDropdown(true);
      });

      $document.on('click', function (e) {
        if (element.has(e.target).length > 0) return;
        scope.toggleDropdown(false);
      });
    }
  };
});