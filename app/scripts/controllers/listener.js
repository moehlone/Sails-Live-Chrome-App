'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:ListenerCtrl
 * @description
 * # ListenerCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('ListenerCtrl', function ($scope, $location, connectionService, notificationService, listeners, storage) {

    if(!connectionService.isConnected()) {

      $location.path('/connect');
    }

    function syncListenerStorage() {

      if(storage.isAvailable()) {

        storage.set('listeners.' + connectionService.url(), $scope.listeners);
      }
    }

    function rebindEvents() {

      /*
       *   socket.off(event, fn) is not working properly! So we have to go this way..
       */

      connectionService.removeAllListeners();

      for(var i = 0; i < $scope.listeners.length; ++i) {

        var listener = $scope.listeners[i];

        connectionService.on(listener.event, function(response) {
          notificationService.info('Listener with event "' + listener.event + '" got triggered.');
          listener.response = response;
          syncListenerStorage();
        });
      }
    }

    if(storage.isAvailable()) {

      storage.get('listeners.' + connectionService.url()).then(function(data) {

        $scope.listeners = typeof data === 'undefined' ? [] : data;
        rebindEvents();
      });
    }
    else {

      $scope.listeners = listeners;
      rebindEvents();
    }

    $scope.oneAtATime = false;
    $scope.listenerEvent = '';
    $scope.sortableOptions = {
      handle: ' .handle'
      // items: ' .panel:not(.panel-heading)'
      // axis: 'y'
    };

    $scope.removeListener = function(index) {

      $scope.listeners.splice(index, 1);
      rebindEvents();
      syncListenerStorage();
    };

    $scope.eventChange = function() {

      rebindEvents();
    };

    $scope.addListener = function () {

      var listener = {
        event: $scope.listenerEvent,
        response: false,
        panelOpen: true
      };

      $scope.listeners.splice(0, 0, listener);

      connectionService.on(listener.event, function(response) {
        notificationService.info('Listener with event "' + listener.event + '" got triggered.');
        listener.response = response;
        syncListenerStorage();
      });

      $scope.listenerEvent = '';

      syncListenerStorage();
    };
  });
