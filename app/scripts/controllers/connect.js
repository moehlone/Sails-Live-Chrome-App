'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:ConnectCtrl
 * @description
 * # ConnectCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('ConnectCtrl', function ($window, $scope, $location, storage, notificationService, connectionService, $timeout, $routeParams, $route) {

    $scope.serverAddress = typeof $routeParams.url !== 'undefined' ? $routeParams.url : '';
    $scope.loginLoading = false;
    $scope.urlUsed = false;

    var connectTimeout = null;

    $scope.connectToServer = function () {

      $scope.loginLoading = true;

      connectionService.connect($scope.serverAddress, function() {

        $scope.urlUsed = true;
      });

      connectionService.on('connect', onConnect);

      connectTimeout = $timeout(function() {

        notificationService.error('Can not connect to ' + $scope.serverAddress);
        $scope.loginLoading = false; // stop loading after 3 seconds if anything happens
      }, 3000);
    };

    function onConnect() {

      $scope.urlUsed = false;

      if(connectTimeout !== null) {

        $timeout.cancel(connectTimeout);
      }


      //initialize socket listeners
      if(storage.isAvailable() && !connectionService.isReconnect()) {

        storage.get('listeners.' + connectionService.url()).then(function(listeners) {

          if(typeof listeners !== 'undefined') {

            connectionService.removeAllListeners();

            for(var i = 0; i < listeners.length; ++i) {

              var listener = listeners[i];

              connectionService.on(listener.event, function(response) {
                notificationService.info('Listener with event "' + listener.event + '" got triggered.');
                listener.response = response;
              });
            }
          }
        });
      }

      if($location.path().indexOf('connect') > -1) {
        //fake timeout because indicator is nice
        $timeout(function() {

          $scope.loginLoading = false;
          $location.path('/request');

        }, 500);
      }
    }
  });
