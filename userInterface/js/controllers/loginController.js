'use strict';

var myApp = angular.module('drona');

myApp.controller('loginController', function(restAPI, $scope, $timeout, $window, $state) {
  $scope.errorMsg = false;
  $scope.otp_pin = true;

  $scope.login = function() {
    if($scope.otp_pin){
      var params = {
        'mobile': $scope.mobile,
        'otp': $scope.otp,
      };
      restAPI.send('post', '/auth/login', null, params)
        .then(function(data) {
          data = data.data;
          $scope.login = true;
          $window.localStorage.setItem('token_p',angular.toJson(data.data.token));
          $state.go('dashboard.classes');
        }, function(data) {
          $scope.errorMsg = data.data.message;
        });

    }
    // else{
    // var params = {
    //   'mobile': $scope.mobile,
    // };
    // restAPI.send('post', '/auth/otp', null, params)
    //   .then(function(data) {
    //     data = data.data;
    //     $scope.otp_pin = true;
    //     $scope.errorMsg = data.message;
    //   }, function(data) {
    //     $scope.errorMsg = data.data.message;
    //   });
    // }
  };

});
