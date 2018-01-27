'use strict';

var myApp = angular.module('drona');

myApp.controller('registerController', function(restAPI, $scope, $timeout, $window, $state) {
  $scope.errorMsg = false;

  $scope.register = function() {

      restAPI.send('post', '/user/signup', null, params)
        .then(function(data) {
          data = data.data;
          $scope.login = true;
          $window.localStorage.setItem('token_p',angular.toJson(data.data.token));
          $state.go('dashboard.recentwords');
        }, function(data) {
          $scope.errorMsg = data.data.message;
        });

    }

});
