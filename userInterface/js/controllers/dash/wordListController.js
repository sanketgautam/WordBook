'use strict';

var myApp = angular.module('drona');

myApp.controller('wordListController', function(restAPI, $scope, $timeout, $mdDialog, $rootScope, $window, $state, SpinnerService) {
  $scope.errorMsg = null;

  $scope.perPage = 10;

  $scope.loadTeachers = function() {
    SpinnerService.transitionStart();

    var params = {
      page: $scope.paging.current,
      perPage: $scope.perPage,
    };

    restAPI.send('get', '/teachers', params, null)
      .then(function(data) {
        var data = data.data.data;
        $scope.teachers = data.teachers;
        $scope.paging.total = data.totalPages;
       }, function(data) {

      }).finally(function(){

        SpinnerService.transitionEnd();
      });
  };

  initPagination();
  function initPagination(){
    console.log($scope.totalPages);
    $scope.paging = {
      total: 1,
      current: 1,
      onPageChanged: $scope.loadTeachers,
    };
  }
  //
  // $scope.doSecondaryAction = function(event) {
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .title('Secondary Action')
  //       .textContent('Secondary actions can be used for one click actions')
  //       .ariaLabel('Secondary click demo')
  //       .ok('Neat!')
  //       .targetEvent(event)
  //   );
  // };

});
