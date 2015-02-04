/* global io */

'use strict';

/**
 * @ngdoc overview
 * @name sails-tester
 * @description
 * # sails-tester
 *
 * Main module of the application.
 */

io.sails.autoConnect = false;

angular
  .module('sails-tester', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'cgNotify',
    'ui.bootstrap',
    'ui.sortable',
    'jsonFormatter'
  ])
  .config(function ($routeProvider, $provide) {

    $routeProvider
      .when('/', {
        redirectTo: '/connect'
      })
      .when('/connect', {
        templateUrl: 'views/connect.html',
        controller: 'ConnectCtrl'
      })
      .when('/request', {
        templateUrl: 'views/request.html',
        controller: 'RequestCtrl'
      })
      .when('/listener', {
        templateUrl: 'views/listener.html',
        controller: 'ListenerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $provide.decorator('accordionDirective', function($delegate) {
      var directive = $delegate[0];
      directive.replace = true;
      return $delegate;
    });
  })
  .run(function(notify) {

    notify.config({
      startTop: 20,
      position: 'right'
    });
  });
