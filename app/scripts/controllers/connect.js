'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:ConnectCtrl
 * @description
 * # ConnectCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('ConnectCtrl', function ($scope, $location, notificationService, connectionService, $timeout) {

    $scope.serverAddress = '';
    $scope.loginLoading = false;

    var connectTimeout = null;

    $scope.connectToServer = function () {

      $scope.loginLoading = true;

      connectionService.connect($scope.serverAddress);

      connectionService.on('connect', onConnect);

      connectTimeout = $timeout(function() {

        notificationService.error('Can not connect to ' + $scope.serverAddress);
        $scope.loginLoading = false; // stop loading after 3 seconds if anything happens
      }, 3000);
    };

    function onConnect() {

      if(connectTimeout !== null) {

        $timeout.cancel(connectTimeout);
      }

      //fake timeout because indicator is nice
      $timeout(function() {

        $scope.loginLoading = false;
        $location.path('/listener');

      }, 1000);
    }
  });
