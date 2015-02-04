'use strict';

describe('Controller: ListenerCtrl', function () {

  // load the controller's module
  beforeEach(module('entryexitApp'));

  var ListenerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListenerCtrl = $controller('ListenerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
