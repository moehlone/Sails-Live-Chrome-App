/* global io */
'use strict';

/**
 * @ngdoc service
 * @name assetsApp.connectionService
 * @description
 * # connectionService
 * Service in the assetsApp.
 */
angular.module('sails-tester')
  .service('connectionService', function ($rootScope) {
    // -----------------------------------------------------------------------------
    // Create the connection to the game server. The "io" variable is the global
    // sails.io object. As an angular service will be instantiated only once, we can
    // connect to the server here.
    // -----------------------------------------------------------------------------

    var socket = null;

    // -----------------------------------------------------------------------------
    // Public api of the connection service
    // -----------------------------------------------------------------------------
    return {

      connect: function(url) {

        io.sails.url = url;
        io.sails.useCORSRouteToGetCookie = true; //don not change!

        socket = io.sails.connect();

        // -----------------------------------------------------------------------------
        // Setup connect and error events
        // TODO: Use notification service or something to notify user whats going on
        // -----------------------------------------------------------------------------
        socket.on('connect', function() {
          console.log('Successfully connected.');
        });

        socket.on('connecting', function() {
          console.log('connecting.');
        });

        socket.on('reconnect', function() {
          console.log('Successfully reconnected.');
        });

        socket.on('connect_error', function() {

          this.disconnect();
          console.log('Connection error.');
        });

        socket.on('connect_failed', function() {

          this.disconnect();
          console.log('Connection error.');
        });

        socket.on('error', function() {

          this.disconnect();
          console.log('Connection error.');
        });

        socket.on('reconnect_failed', function() {
          console.log('Could not reconnect within specified reconnection attempts.');
        });
      },

      isConnected: function() {

        return socket !== null ? socket.isConnected() : false;

      },

      get: function(url, payload, callback) {
        socket.get(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      post: function(url, payload, callback) {
        socket.post(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      delete: function(url, payload, callback) {
        socket.post(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      put: function(url, payload, callback) {
        socket.post(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },

      off: function(event, fn) {
        socket.off(event, fn);
      },

      removeAllListeners: function() {
        socket.removeAllListeners();
      }
    };
  });
