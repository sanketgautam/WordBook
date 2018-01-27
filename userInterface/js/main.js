'use strict';

var myApp = angular.module('drona', ['ngRoute', 'ui.router', 'ngMaterial', 'ngMessages', 'cl.paging', 'md.data.table']);
myApp.config(['$locationProvider', '$stateProvider', '$httpProvider', function($locationProvider, $stateProvider, $httpProvider) {
  $stateProvider

    .state('dashboard', {
      url: '',
      views: {
        '': {
          templateUrl: 'views/layouts/layout.dashboard.html',
          controller: 'dashboardCommonController',
        }
      }
    })
   
    .state('dashboard.dict', {
      url: '/',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.dict': {
          templateUrl: 'views/dash/wordlist.html',
          controller: 'wordListController',
        }
      }
    });


  $locationProvider.html5Mode(true).hashPrefix('!');


  $httpProvider.interceptors.push('authInterceptor');
}]);


//
//
myApp.service('SpinnerService', ['$rootScope', function($rootScope) {
  return {
    transitionStart: function() {
      $rootScope.isLoading = true;
    },
    transitionEnd: function() {
      $rootScope.isLoading = false;
    },
  }
}]);
//
// myApp.run(function($rootScope, SpinnerService) {
//   $rootScope.$on('$stateChangeStart', function() {
//     console.log('start');
//     SpinnerService.transitionStart();
//   });
//   $rootScope.$on('$stateChangeSuccess', function() {
//     console.log('success');
//     SpinnerService.transitionEnd();
//   });
//   $rootScope.$on('$stateChangeError', function() {
//     SpinnerService.transitionEnd();
//   });
// })

// Migrate to: UI-Router 1.0 Transition Hook

// Migrate to: UI-Router 1.0 Trace service


myApp.run(function($transitions) {
  $transitions.onStart({}, function(trans) {
    var SpinnerService = trans.injector().get('SpinnerService');
    SpinnerService.transitionStart();
    trans.promise.finally(SpinnerService.transitionEnd);
  });
})
