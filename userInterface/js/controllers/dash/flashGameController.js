'use strict';

var myApp = angular.module('drona');

myApp.controller('flashGameController', function(restAPI, $scope, $timeout, $mdDialog, $rootScope, $window, $state, SpinnerService) {
  $scope.errorMsg = null;

  $scope.getUserWords = function() {
    SpinnerService.transitionStart();


    restAPI.send('get', '/user/words', null, null)
      .then(function(data) {
        var data = data.data.data;
        //  console.log(data);
        $scope.words = data;
        $scope.i = 0;
        $scope.word = $scope.words[$scope.i];


      }, function(data) {

      }).finally(function() {

        SpinnerService.transitionEnd();
      });
  };

  $scope.getUserWords();


  $scope.getnext = function() {
    if ($scope.i < $scope.words.length-1) $scope.i++;


    $scope.word = $scope.words[$scope.i];
  };
  $scope.getprev = function() {
    if ($scope.i >= 1) $scope.i--;

     $scope.word = $scope.words[$scope.i];
  };


});
