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

    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: 'views/dash/login.html',
          controller: 'loginController',
        }
      }
    })

    .state('register', {
      url: '/register',
      views: {
        '': {
          templateUrl: 'views/dash/register.html',
          controller: 'registerController',
        }
      }
    })
    .state('logout', {
      url: '/logout',
      views: {
        '': {
          templateUrl: 'views/dashboard/logout.html',
          controller: 'logoutController',
        }
      }
    })


    .state('dashboard.recentwords', {
      url: '/',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.recentwords': {
          templateUrl: 'views/dash/wordlist.html',
          controller: 'recentWordController',
        }
      }
    })
    .state('dashboard.mywordscollection', {
      url: '/mywordscollection',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.mywordscollection': {
          templateUrl: 'views/dash/mywordscollection.html',
          controller: 'wordListController',
        }
      }
    })

    .state('dashboard.recommend', {
      url: '/vocabgames',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.recommend': {
          templateUrl: 'views/dash/wordRecommend.html',
          controller: 'wordRecommendController',
        }
      }
    })
    .state('dashboard.vocabgames', {
      url: '/vocabgames',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.vocabgames': {
          templateUrl: 'views/dash/vocabgames.html',
          controller: 'gameController',
        }
      }
    })
    .state('dashboard.flashcard', {
      url: '/vocabgames/flashcard',
      views: {
        'main@dashboard': {
          templateUrl: 'views/dash/dashboard.sub.layout.html'
        },
        'subview@dashboard.flashcard': {
          templateUrl: 'views/dash/flashcards.html',
          controller: 'flashGameController',
        }
      }
    });


//  $locationProvider.html5Mode(true).hashPrefix('!');


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
