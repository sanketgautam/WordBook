'use strict';

var myApp = angular.module('drona');

myApp.controller('wordRecommendController', function(restAPI, $scope, $timeout, $mdDialog, $rootScope, $window, $state, SpinnerService) {
  $scope.errorMsg = null;
  $rootScope.section_name = "Recommended Words";

  $scope.getUserWords = function() {
    SpinnerService.transitionStart();


    restAPI.send('get', '/user/recommend', null, null)
      .then(function(data) {
        var data = data.data.data;
      //  console.log(data);
        $scope.words = data;

       }, function(data) {

      }).finally(function(){

        SpinnerService.transitionEnd();
      });
  };

  $scope.getUserWords();

});
