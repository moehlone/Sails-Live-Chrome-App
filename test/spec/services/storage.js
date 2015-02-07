'use strict';

describe('Service: storage', function () {

  // load the service's module
  beforeEach(module('entryexitApp'));

  // instantiate service
  var storage;
  beforeEach(inject(function (_storage_) {
    storage = _storage_;
  }));

  it('should do something', function () {
    expect(!!storage).toBe(true);
  });

});
