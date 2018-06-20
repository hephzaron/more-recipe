import chai from 'chai';
import ErrorHandler from '../../../helpers/ErrorHandler';

const { assert } = chai;
const { handleErrors } = ErrorHandler;

describe('Error Handler', () => {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', () => {
    it('it should return status 400 for invalid request', () => {
      const error = {
        name: 'SequelizeValidation...',
        message: 'Invalid user input'
      };
      const { name, message, statusCode } = handleErrors(error);
      assert.equal(statusCode, 400);
      assert.equal(name, 'Bad Request');
      assert.equal(message, error.message);
    });

    it('it should return status 409 for conflicting or existing details', () => {
      const error = {
        name: 'SequelizeValidationError',
        message: '...belongs to a user'
      };
      const { name, message, statusCode } = handleErrors(error);
      assert.equal(statusCode, 409);
      assert.equal(name, 'Conflict');
      assert.equal(message, error.message);
    });

    it('it should return status 500 for unspecified error name', () => {
      const error = {
        message: 'I am not specified'
      };
      const { name, message, statusCode } = handleErrors(error);
      assert.equal(name, 'Server Error');
      assert.equal(message, 'Internal Server Error');
      assert.equal(statusCode, 500);
    });

    /**
     * @function Invalid entries suite
     */
    describe('# Invalid entries', () => {
      it('it should return status 500 for undefined error message', () => {
        const { message, statusCode } = handleErrors();
        assert.equal(message, 'Internal Server Error');
        assert.equal(statusCode, 500);
      });

      it('it should return status 500 for non existing status codes', () => {
        const error = {
          name: 'I really don\'t exist',
          message: 'uuhm!?'
        };
        const { name, message, statusCode } = handleErrors(error);
        assert.equal(name, 'Server Error');
        assert.equal(message, 'Internal Server Error');
        assert.equal(statusCode, 500);
      });
    });
  });
});