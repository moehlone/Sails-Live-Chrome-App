'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('RequestCtrl', function ($scope, $location, connectionService, notificationService, requests, storage) {

    if(!connectionService.isConnected()) {

      $location.path('/connect');
    }


    if(storage.isAvailable()) {

      storage.get('requests.' + connectionService.url()).then(function(data) {

        $scope.requests = typeof data === 'undefined' ? [] : data;
      });
    }
    else {

      $scope.requests = requests;
    }

    connectionService.on('connect', function() {

      $scope.connected = true;
    });

    connectionService.on('disconnect', function() {

      $scope.connected = false;
    });

    $scope.connected = true;
    $scope.oneAtATime = false;
    $scope.requestPath = '';
    $scope.requestType = '';
    $scope.requestTypes = [
      {id: 1, name: 'GET'},
      {id: 2, name: 'POST'},
      {id: 3, name: 'PUT'},
      {id: 4, name: 'DELETE'}
    ];
    $scope.sortableOptions = {
      handle: ' .handle'
      // items: ' .panel:not(.panel-heading)'
      // axis: 'y'
    };

    function syncRequestStorage() {

      if(storage.isAvailable()) {

        storage.set('requests.' + connectionService.url(), $scope.requests);

      }
    }

    $scope.jsonCheck = function(request) {

      if(request.payload === '') {

        request.invalidJSONPayload = false;
        return;
      }

      try {

        JSON.parse(request.payload);
        request.invalidJSONPayload = false;
      }
      catch(exception) {

        request.invalidJSONPayload = true;
        return;
      }
    };

    $scope.sendRequest = function (request) {

      var payload = {};
      request.active = true;

      if(request.invalidJSONPayload) {

        notificationService.warning('Invalid JSON syntax! Payload was ignored for ' + request.type.name + ' request on ' + request.path);
      }
      else if(request.payload !== '') {

        try {

          payload = JSON.parse(request.payload);
        }
        catch(exception) {

          payload = {};
        }
      }

      connectionService[request.type.name.toLowerCase()](request.path, payload, function(data, jwres) {

        var notificationMessage = request.type.name + ' on ' + request.path + ' returned with status code ' + jwres.statusCode;

        if(jwres.statusCode === 200) {
          notificationService.success(notificationMessage);
        }
        else {
          notificationService.warning(notificationMessage);
        }

        request.response = jwres.toPOJO();

        /*
        request.responseData = request.response.body;

        if(typeof request.responseData === 'object') {

          request.responseDataIsJSON = true;
        }
        else {

          request.responseDataIsJSON = false;
        }*/

        request.active = false;

        syncRequestStorage();
      });
    };

    $scope.removeRequest = function(index) {
      $scope.requests.splice(index, 1);

      syncRequestStorage();
    };

    $scope.addRequest = function () {

      $scope.requests.splice(0, 0, {
        path: $scope.requestPath,
        payload: '',
        type: $scope.requestType,
        response: false,
        //responseData: false,
        //responseDataIsJSON: true,
        panelOpen: true,
        active: false,
        invalidJSONPayload: false
      });

      $scope.requestPath = '';
      $scope.requestType = '';

      syncRequestStorage();
    };

  });
