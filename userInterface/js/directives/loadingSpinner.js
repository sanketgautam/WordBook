var myApp = angular.module('drona');

myApp.directive('spinner', spinner);

function spinner() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div flex layout="column" id="loading-div" layout-align="center center"><md-progress-circular md-mode="intermediate"></md-progress-circular></div>',
    link: function(scope, element, attrs) {

      scope.$watch('isLoading', function(val) {
         if (val) {
          element.removeClass('ng-hide');

        } else {
          element.addClass('ng-hide');
        }
      });

    },
  };
};
