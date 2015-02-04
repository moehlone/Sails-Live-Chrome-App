'use strict';

/**
 * @ngdoc service
 * @name assetsApp.notificationService
 * @description
 * # notificationService
 * Service in the assetsApp.
 */
angular.module('sails-tester')
  .service('notificationService', function ($rootScope, notify) {

    return {

      warning: function(message) {

        notify({message: message, templateUrl: 'views/notification/warning.html'});
      },

      success: function(message) {

        notify({message: message, templateUrl: 'views/notification/success.html'});
      },

      info: function(message) {

        notify({message: message, templateUrl: 'views/notification/information.html'});
      },

      error: function(message) {

        notify({message: message, templateUrl: 'views/notification/error.html'});
      }

    };
  });
