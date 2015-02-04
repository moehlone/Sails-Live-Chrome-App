'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('RequestCtrl', function ($scope, $location, connectionService, notificationService, requests) {

    if(!connectionService.isConnected()) {

      $location.path('/connect');
    }

    $scope.oneAtATime = false;
    $scope.requestPath = '';
    $scope.requestType = '';
    $scope.requests = requests;
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

    $scope.sendRequest = function (request) {

      var paramsAsJson = {};

      request.active = true;

      if(request.parameters !== '') {

        try {

          paramsAsJson = JSON.parse(request.parameters);
        }
        catch(exception) {

          paramsAsJson = {};
          notificationService.warning('Invalid JSON syntax! Payload was ignored for ' + request.type.name + ' request on ' + request.path);
        }
      }

      connectionService[request.type.name.toLowerCase()](request.path, paramsAsJson, function(data, jwres) {

        var notificationMessage = request.type.name + ' on ' + request.path + ' returned with status code ' + jwres.statusCode;

        if(jwres.statusCode === 200) {
          notificationService.success(notificationMessage);
        }
        else {
          notificationService.warning(notificationMessage);
        }

        request.response = jwres;

        var jsonData = {};

        try {

          jsonData = JSON.parse(data);
          request.responseData = jsonData;

        }
        catch(exception) {

          request.responseData = data;
        }

        request.active = false;
      });
    };

    $scope.removeRequest = function(index) {
      $scope.requests.splice(index, 1);
    };

    $scope.addRequest = function () {

      $scope.requests.splice(0, 0, {
        path: $scope.requestPath,
        parameters: '',
        type: $scope.requestType,
        response: {},
        responseData: {},
        responseDataIsJSON: true,
        panelOpen: true,
        active: false
      });

      $scope.requestPath = '';
      $scope.requestType = '';
    };

  });
