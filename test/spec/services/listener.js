'use strict';

describe('Service: listener', function () {

  // load the service's module
  beforeEach(module('entryexitApp'));

  // instantiate service
  var listener;
  beforeEach(inject(function (_listener_) {
    listener = _listener_;
  }));

  it('should do something', function () {
    expect(!!listener).toBe(true);
  });

});
