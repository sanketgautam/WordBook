'use strict';

var myApp = angular.module('vidPlatform');

myApp.controller('videosController', function(restAPI,$rootScope, $window, $scope, $timeout, $location) {
    $scope.videos = [];
    $scope.limit = 10;
    $scope.skip = 0;

    $scope.loadVideos = function() {
        var params = {
            skip: $scope.skip * $scope.limit,
            limit: $scope.limit,
            sessionId: angular.fromJson($window.localStorage.getItem('sessionId')),
        };
        $rootScope.$broadcast("loader_show");
        restAPI.send('get', '/videos', params).then(function(resp) {
            $scope.videos = $scope.videos.concat(resp.data.data);
            $scope.skip++;
            $rootScope.$broadcast('loadingComplete');

        }, function(error) {
          $rootScope.$broadcast('loadingFailed');
          // console.log('loading-failed');
        }).finally(function(){
          $scope.$broadcast("loader_hide");
        });
    }

    $scope.loadMore = function() {
        $scope.loadVideos();
    }

});
