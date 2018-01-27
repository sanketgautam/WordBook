var myApp = angular.module('vidPlatform');
myApp.filter('ratingAvg', function() {
    return function(ratingArray) {
     if(!angular.isArray(ratingArray)) return 0;
     else{
        var sum = 0;
        for (var i of ratingArray) sum += parseInt(i, 10);
        return (sum/ratingArray.length).toFixed(1);
      }
    };
});
