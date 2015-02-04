'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:ConnectCtrl
 * @description
 * # ConnectCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('ConnectCtrl', function ($scope, $location, notificationService, connectionService) {

    $scope.serverAddress = '';

    $scope.connectToServer = function () {

      connectionService.connect($scope.serverAddress);

      connectionService.on('connect', onConnect);
      connectionService.on('connect_error', onConnectError);


    };

    function onConnect() {

      notificationService.success('Connection to ' + $scope.serverAddress + ' established.');
      $location.path('/request');
    }

    function onConnectError() {
      notificationService.error('Connection to ' + $scope.serverAddress + ' could not be established.');
    }
  });
