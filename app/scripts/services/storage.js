'use strict';

/**
 * @ngdoc service
 * @name sails-tester.storage
 * @description
 * # storage
 * Factory in the sails-tester.
 */
angular.module('sails-tester')
  .factory('storage', function ($q) {
    return {
      get: function(key) {
        var deferred = $q.defer();

        chrome.storage.local.get(key, function(data) {
          deferred.resolve(data[key]);
        });

        return deferred.promise;
      },
      set: function(key, value) {
        var deferred = $q.defer();

        var data = {};
        data[key] = value;
        chrome.storage.local.set(data, function() {
          deferred.resolve({});
        });

        return deferred.promise;
      },
      del: function(key) {
        var deferred = $q.defer();

        chrome.storage.local.remove(key, function() {
          deferred.resolve({});
        });

        return deferred.promise;
      },
      isAvailable: function() {

        return typeof chrome !== 'undefined' && chrome.hasOwnProperty('storage');
      }
    }
  });
