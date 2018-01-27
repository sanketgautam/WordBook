var myApp = angular.module('vidPlatform');

myApp.directive('rating', rating);

function rating() {
    return {
        restrict: 'E',
        transclude: true,
        template: `<div class="ratingPre"></div>`,
        link: function link(scope, element, attrs) {
            var max_ = 5;
            attrs.$observe('val', function(current_) {
                current_ = Math.floor(current_) || 0;
                var stars_ = new Array(max_);
                stars_.fill('<span class="filled"></span>', 0, current_);
                stars_.fill('<span></span>', current_, max_);
                element.html(stars_.join(''));
            });
        },
    }
};
