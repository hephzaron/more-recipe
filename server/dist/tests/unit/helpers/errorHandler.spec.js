'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _ErrorHandler = require('../../../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


describe('Error Handler', function () {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', function () {
    it('it should return status 400 for invalid request', function () {
      var error = {
        name: 'Invalid Request',
        message: 'I am invalid'
      };

      var _ErrorHandler$handleE = _ErrorHandler2.default.handleErrors(error),
          name = _ErrorHandler$handleE.name,
          message = _ErrorHandler$handleE.message,
          statusCode = _ErrorHandler$handleE.statusCode;

      assert.equal(name, error.name);
      assert.equal(message, error.message);
      assert.equal(statusCode, 400);
    });

    it('it should return status 401 for unauthorized access', function () {
      var error = {
        name: 'Unauthorized',
        message: 'I am unauthorized'
      };

      var _ErrorHandler$handleE2 = _ErrorHandler2.default.handleErrors(error),
          name = _ErrorHandler$handleE2.name,
          message = _ErrorHandler$handleE2.message,
          statusCode = _ErrorHandler$handleE2.statusCode;

      assert.equal(name, error.name);
      assert.equal(message, error.message);
      assert.equal(statusCode, 401);
    });
  });

  it('it should return status 403 for forbidden action', function () {
    var error = {
      name: 'Forbidden',
      message: 'I am forbidden'
    };

    var _ErrorHandler$handleE3 = _ErrorHandler2.default.handleErrors(error),
        name = _ErrorHandler$handleE3.name,
        message = _ErrorHandler$handleE3.message,
        statusCode = _ErrorHandler$handleE3.statusCode;

    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 403);
  });

  it('it should return status 404 for resources not found', function () {
    var error = {
      name: 'Not Found',
      message: 'I am not existing'
    };

    var _ErrorHandler$handleE4 = _ErrorHandler2.default.handleErrors(error),
        name = _ErrorHandler$handleE4.name,
        message = _ErrorHandler$handleE4.message,
        statusCode = _ErrorHandler$handleE4.statusCode;

    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 404);
  });

  it('it should return status 409 for conflicting or existing details', function () {
    var error = {
      name: 'Conflict',
      message: 'I am already existing'
    };

    var _ErrorHandler$handleE5 = _ErrorHandler2.default.handleErrors(error),
        name = _ErrorHandler$handleE5.name,
        message = _ErrorHandler$handleE5.message,
        statusCode = _ErrorHandler$handleE5.statusCode;

    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 409);
  });

  it('it should return status 500 for unspecified error name', function () {
    var error = {
      message: 'I am not specified'
    };

    var _ErrorHandler$handleE6 = _ErrorHandler2.default.handleErrors(error),
        name = _ErrorHandler$handleE6.name,
        message = _ErrorHandler$handleE6.message,
        statusCode = _ErrorHandler$handleE6.statusCode;

    assert.equal(name, 'Server Error');
    assert.equal(message, 'Internal Server Error');
    assert.equal(statusCode, 500);
  });

  /**
   * @function Invalid entries suite
   */
  describe('# Invalid entries', function () {
    it('it should return status 500 for undefined error message', function () {
      var _ErrorHandler$handleE7 = _ErrorHandler2.default.handleErrors(),
          message = _ErrorHandler$handleE7.message,
          statusCode = _ErrorHandler$handleE7.statusCode;

      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });

    it('it should return status 500 for non existing status codes', function () {
      var error = {
        name: 'I really don\'t exist',
        message: 'uuhm!?'
      };

      var _ErrorHandler$handleE8 = _ErrorHandler2.default.handleErrors(error),
          name = _ErrorHandler$handleE8.name,
          message = _ErrorHandler$handleE8.message,
          statusCode = _ErrorHandler$handleE8.statusCode;

      assert.equal(name, 'Server Error');
      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });
  });
});