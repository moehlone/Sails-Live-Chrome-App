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
  .service('connectionService', function ($rootScope, notificationService) {
    // -----------------------------------------------------------------------------
    // Create the connection to the game server. The "io" variable is the global
    // sails.io object. As an angular service will be instantiated only once, we can
    // connect to the server here.
    // -----------------------------------------------------------------------------

    var socket = null;
    var isNew = true;
    var usedURLs = [];

    function clearConnection() {

      if(socket !== null && socket.isConnected()) {

        socket.disconnect();
      }

    }

    // -----------------------------------------------------------------------------
    // Public api of the connection service
    // -----------------------------------------------------------------------------
    return {

      isNew: function() {

        return isNew;
      },

      connect: function(url, cbUrlUsed) {

        isNew = true;

        for(var i=0; i < usedURLs.length; ++i) {

          if(usedURLs[i].indexOf(url) > -1) {

            if(typeof cbUrlUsed === 'function') {
              cbUrlUsed();
            }

            return;
          }
        }

        usedURLs.push(url);

        io.sails.useCORSRouteToGetCookie = false;

        /*
        if(url.indexOf('http://localhost') > -1 || url.indexOf('https://localhost') > -1) {

          io.sails.useCORSRouteToGetCookie = true;
        }
        else{

          io.sails.useCORSRouteToGetCookie = false;
        }
        */

        if(socket !== null) {

          clearConnection();
        }

        socket = io.sails.connect(url, {
          transports: ['websocket']
        });

        socket.on('connect', function() {

          isNew = false;
          notificationService.success('Connection to ' + socket.url + ' established');
        });

        socket.on('reconnecting', function() {

          notificationService.info('Trying to reconnect to ' + socket.url);
        });

        socket.on('reconnect', function() {

          //notificationService.success('Reconnected to ' + this.url);
        });

        socket.on('disconnect', function() {

          notificationService.warning('Disconnected from ' + socket.url);
        });

        socket.on('connect_error', function() {

          if(isNew) {
            this.disconnect();
          }
        });

        socket.on('connect_failed', function() {

          this.disconnect();
          notificationService.error('Connection failed');
        });

        socket.on('error', function() {

          this.disconnect();
          notificationService.error('Socket error');
        });

        socket.on('reconnect_failed', function() {

          this.disconnect();
          notificationService.error('Reconnection failed - Aborting');
        });
      },

      isConnected: function() {

        return socket !== null ? socket.isConnected() : false;

      },

      get: function(url, payload, callback) {

        if(!this.isConnected()) {
          return;
        }

        socket.get(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      post: function(url, payload, callback) {

        if(!this.isConnected()) {
          return;
        }

        socket.post(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      delete: function(url, payload, callback) {

        if(!this.isConnected()) {
          return;
        }

        socket.delete(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      put: function(url, payload, callback) {

        if(!this.isConnected()) {
          return;
        }

        socket.put(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      on: function (eventName, callback) {

        if(socket === null) {
          return;
        }

        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },

      url: function() {

        return socket !== null ? socket.url : 'http://nosocket';
      },

      removeAllListeners: function() {

        if(socket !== null) {
          socket.removeAllListeners();
        }
      }
    };
  });
