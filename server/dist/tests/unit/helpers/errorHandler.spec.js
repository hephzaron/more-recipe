'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _ErrorHandler = require('../../../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;
var handleErrors = _ErrorHandler2.default.handleErrors;


describe('Error Handler', function () {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', function () {
    it('it should return status 400 for invalid request', function () {
      var error = {
        name: 'SequelizeValidation...',
        message: 'Invalid user input'
      };

      var _handleErrors = handleErrors(error),
          name = _handleErrors.name,
          message = _handleErrors.message,
          statusCode = _handleErrors.statusCode;

      assert.equal(statusCode, 400);
      assert.equal(name, 'Bad Request');
      assert.equal(message, error.message);
    });

    it('it should return status 409 for conflicting or existing details', function () {
      var error = {
        name: 'SequelizeValidationError',
        message: '...belongs to a user'
      };

      var _handleErrors2 = handleErrors(error),
          name = _handleErrors2.name,
          message = _handleErrors2.message,
          statusCode = _handleErrors2.statusCode;

      assert.equal(statusCode, 409);
      assert.equal(name, 'Conflict');
      assert.equal(message, error.message);
    });

    it('it should return status 500 for unspecified error name', function () {
      var error = {
        message: 'I am not specified'
      };

      var _handleErrors3 = handleErrors(error),
          name = _handleErrors3.name,
          message = _handleErrors3.message,
          statusCode = _handleErrors3.statusCode;

      assert.equal(name, 'Server Error');
      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });

    /**
     * @function Invalid entries suite
     */
    describe('# Invalid entries', function () {
      it('it should return status 500 for undefined error message', function () {
        var _handleErrors4 = handleErrors(),
            message = _handleErrors4.message,
            statusCode = _handleErrors4.statusCode;

        assert.equal(message, 'Internal Server Error');
        assert.equal(statusCode, 500);
      });

      it('it should return status 500 for non existing status codes', function () {
        var error = {
          name: 'I really don\'t exist',
          message: 'uuhm!?'
        };

        var _handleErrors5 = handleErrors(error),
            name = _handleErrors5.name,
            message = _handleErrors5.message,
            statusCode = _handleErrors5.statusCode;

        assert.equal(name, 'Server Error');
        assert.equal(message, 'Internal Server Error');
        assert.equal(statusCode, 500);
      });
    });
  });
});