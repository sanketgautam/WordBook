'use strict';

var myApp = angular.module('vidPlatform');

myApp.controller('videoSingleController', function(restAPI, $routeParams, $rootScope, $window, $scope, $timeout, $location) {
    $scope.videos = [];
    $scope.rating_ = 2;

    $scope.loadVideo = function() {
        $scope.$broadcast("loader_show");
        var params = {
            videoId: $routeParams.videoId,
            sessionId: angular.fromJson($window.localStorage.getItem('sessionId')),
        };
        restAPI.send('get', '/video', params).then(function(resp) {
            $scope.video = resp.data.data;
            $rootScope.page_title = $scope.video.name;
        }, function(error) {

        }).finally(function() {
            $scope.$broadcast("loader_hide");
        });
    }

    $scope.loadOtherVideos = function(skip, limit) {
        var params_ = {
            skip: 1,
            limit: limit,
            sessionId: angular.fromJson($window.localStorage.getItem('sessionId')),
        };
        restAPI.send('get', '/videos', params_).then(function(resp) {
            $scope.otherVideos = resp.data.data;
        }, function(error) {});
    }

    $scope.loadVideo();

    $timeout(function() {
        $scope.loadOtherVideos(1, 5);
    }, 100)

    $scope.saveRating = function(_id) {
      
    };

});
