import chai from 'chai';
import ErrorHandler from '../../../helpers/ErrorHandler';

const { assert } = chai;

describe('Error Handler', () => {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', () => {
    it('it should return status 400 for invalid request', () => {
      const error = {
        name: 'Invalid Request',
        message: 'I am invalid'
      };
      const { name, message, statusCode } = ErrorHandler.handleErrors(error);
      assert.equal(name, error.name);
      assert.equal(message, error.message);
      assert.equal(statusCode, 400);
    });

    it('it should return status 401 for unauthorized access', () => {
      const error = {
        name: 'Unauthorized',
        message: 'I am unauthorized'
      };
      const { name, message, statusCode } = ErrorHandler.handleErrors(error);
      assert.equal(name, error.name);
      assert.equal(message, error.message);
      assert.equal(statusCode, 401);
    });
  });

  it('it should return status 403 for forbidden action', () => {
    const error = {
      name: 'Forbidden',
      message: 'I am forbidden'
    };
    const { name, message, statusCode } = ErrorHandler.handleErrors(error);
    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 403);
  });

  it('it should return status 404 for resources not found', () => {
    const error = {
      name: 'Not Found',
      message: 'I am not existing'
    };
    const { name, message, statusCode } = ErrorHandler.handleErrors(error);
    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 404);
  });

  it('it should return status 409 for conflicting or existing details', () => {
    const error = {
      name: 'Conflict',
      message: 'I am already existing'
    };
    const { name, message, statusCode } = ErrorHandler.handleErrors(error);
    assert.equal(name, error.name);
    assert.equal(message, error.message);
    assert.equal(statusCode, 409);
  });

  it('it should return status 500 for unspecified error name', () => {
    const error = {
      message: 'I am not specified'
    };
    const { name, message, statusCode } = ErrorHandler.handleErrors(error);
    assert.equal(name, 'Server Error');
    assert.equal(message, 'Internal Server Error');
    assert.equal(statusCode, 500);
  });

  /**
   * @function Invalid entries suite
   */
  describe('# Invalid entries', () => {
    it('it should return status 500 for undefined error message', () => {
      const { message, statusCode } = ErrorHandler.handleErrors();
      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });

    it('it should return status 500 for non existing status codes', () => {
      const error = {
        name: 'I really don\'t exist',
        message: 'uuhm!?'
      };
      const { name, message, statusCode } = ErrorHandler.handleErrors(error);
      assert.equal(name, 'Server Error');
      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });
  });
});