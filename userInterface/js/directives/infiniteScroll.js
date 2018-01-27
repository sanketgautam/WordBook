var myApp = angular.module('vidPlatform');

myApp.directive('scroller', infiniteScroll);

infiniteScroll.$inject = ['$document', '$window', '$timeout'];

function infiniteScroll($document, $window, $timeout) {
    return {
        scope: {
            isLoading: '=',
            scroller: '&',
        },
        link: function link(scope, element, attrs) {

            var raw = element[0];
            $timeout(function() {
                if (($window.innerHeight > raw.offsetHeight + raw.offsetTop) && (!scope.isLoading)) {
                    start();
                }
            }, 200);

            $document.on('scroll', function() {
              console.log(scope.isLoading);

                if (($window.innerHeight + $window.scrollY >= raw.offsetHeight + raw.offsetTop) && (!scope.isLoading)) {
                    start();
                }
            });

            function start() {
                scope.isLoading = true;
                var q = scope.scroller();
                if (q && q.then) {
                    q['finally'](function() {
                        scope.$broadcast('loadingComplete');
                    });
                }
            }
            scope.$on('loadingComplete', function() {
                $timeout(function() {
                    scope.isLoading = false;
                }, 300);
            });
            scope.$on('loadingFailed', function() {
              // alert('Unable to load');
            });
        },
    };
}
