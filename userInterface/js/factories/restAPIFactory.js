;
(function() {


    'use strict';

    angular
        .module('drona')
        .factory('restAPI', [
            '$http', '$rootScope', '$q', 'CONSTANTS', restAPI
        ]);

    function restAPI($http, $rootScope, $q, CONSTANTS) {
        var service = {
            send: send
        };
        return service;

        function send(method, url, params, data) {
            var deferred = $q.defer();
            $http({
                method: method,
                url: CONSTANTS.API_URL + url,
                params: params,
                data: data,
                timeout : 10000,
            }).then(function(data) {
                if (!data.config) {
                    console.log('Server error occured.');
                }
                deferred.resolve(data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    }


})();
