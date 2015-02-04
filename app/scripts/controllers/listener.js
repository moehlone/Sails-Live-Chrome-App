'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:ListenerCtrl
 * @description
 * # ListenerCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('ListenerCtrl', function ($scope, $location, connectionService, notificationService, listeners) {

    if(!connectionService.isConnected()) {

      $location.path('/connect');
    }

    $scope.oneAtATime = false;
    $scope.listenerEvent = '';
    $scope.listeners = listeners;
    $scope.sortableOptions = {
      handle: ' .handle'
      // items: ' .panel:not(.panel-heading)'
      // axis: 'y'
    };

    $scope.removeListener = function(index) {

      var listener = $scope.listeners.splice(index, 1);
      connectionService.off(listener.event, listener.fn);

    };

    $scope.addListener = function () {

      var listener = {
        event: $scope.listenerEvent,
        response: {},
        panelOpen: true
      };

      $scope.listeners.splice(0, 0, listener);

      connectionService.on($scope.listenerEvent, function(response) {
        notificationService.info('Listener with event "' + listener.event + '" got triggered.');
        listener.response = response;
      });

      $scope.listenerEvent = '';
    };
  });
