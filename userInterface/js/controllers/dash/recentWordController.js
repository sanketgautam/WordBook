'use strict';

var myApp = angular.module('drona');

myApp.controller('recentWordController', function(restAPI, $scope, $timeout, $mdDialog, $rootScope, $window, $state, SpinnerService) {
  $scope.errorMsg = null;
  $rootScope.section_name = "Recent Words";

  $scope.getUserWords = function() {
    SpinnerService.transitionStart();


    restAPI.send('get', '/user/recent', null, null)
      .then(function(data) {
        var data = data.data.data;
        $scope.recentwords = data;
       }, function(data) {

      }).finally(function(){

        SpinnerService.transitionEnd();
      });
  };

  $scope.getUserWords();

});
