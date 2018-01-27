;
(function() {


  angular
    .module('drona')
    .factory('authInterceptor', authInterceptor);

  /* Injecting the required dependencies in the factory */
  authInterceptor.$inject = ['$rootScope', '$timeout', '$q', '$state', '$window'];

  function authInterceptor($rootScope, $timeout, $q, $state, $window) {

    return {
      /* intercept every request */
      request: function(config) {
        config.headers = config.headers || {};

        // the HTTP method, the URL, even the request body etc.
        var folder = 'views';
        if (config.url.indexOf(folder + "/") !== 0)
          config.headers.Authorization = 'Bearer ' + angular.fromJson($window.localStorage.getItem('token_p'));


        return config;
      },

      /* checking for the errors in response */
      responseError: function(response) {
        if (response.status === 404) {
          $state.go('home');
          return $q.reject(response);
        } else if (response.status === 403 || response.status === 401) {
          $state.go('login');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      },
      response: function(response) {
        /* using timeout to delay the response.
         * It is only for emulating and showing the spinner
         * because http response is very fast for localhost
         */
        return $timeout(function() {
          return response;
        }, 20);

      }
    };
  }


})();
