'use strict';

/**
 * @ngdoc function
 * @name Sails-SRESTClient.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the Sails-SRESTClient
 */
angular.module('sails-tester')
  .controller('NavigationCtrl', function ($scope, $location) {

    $scope.items = [
      {path: '/connect', title: 'Connect'},
      {path: '/request', title: 'Request'},
      {path: '/listener', title: 'Listener'}
    ];

    $scope.isActive = function(item) {
      if (item.path == $location.path()) {
        return true;
      }
      return false;
    };
  });
