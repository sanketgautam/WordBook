
'use strict';

var myApp = angular.module('drona');

myApp.controller('logoutController', function(restAPI, $scope, $timeout, $window, $state) {

  $window.localStorage.removeItem('token_');

});
