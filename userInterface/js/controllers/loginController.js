'use strict';

var myApp = angular.module('drona');

myApp.controller('loginController', function(restAPI, $scope, $timeout, $window, $state) {
  $scope.errorMsg = false;

  $scope.login = function() {

      var params = {
        'email': $scope.email,
        'password': $scope.password,
      };
      restAPI.send('post', '/user/login', null, params)
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
