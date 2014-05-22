'use strict';

/**
 * Directive that toggles dropdonws
 */

angular.module('Mashape-Todo').directive('dropdown', function ($document) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.dropdownVisible = false;

      scope.$watch('dropdownVisible', function (newValue, oldValue) {
        if (newValue === oldValue) return;

        element.toggleClass(attrs.dropdownToggleClass || 'open', newValue);
      });

      element.find('[data-toggle="dropdown"]').on('click', function () {
        scope.dropdownVisible = !scope.dropdownVisible;
        scope.$apply();
      });

      $document.on('click', function (e) {
        if (element.has(e.target).length > 0) return;
        scope.dropdownVisible = false;
        scope.$apply();
      });
    }
  };
});