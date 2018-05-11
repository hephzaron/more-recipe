import chai from 'chai';
import signToken from '../../../helpers/signToken';

const { assert } = chai;

describe('Sign Token', () => {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', () => {
    it('it should sign token', () => {
      const req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {
          email: 'email'
        }
      };
      const { token } = signToken(req);
      assert.equal(typeof(token), 'string');
    });
  });

  /**
   * @function Invalid entries suite
   */
  describe('# Invalid Entries', () => {
    it('it should not sign token with empty email', (done) => {
      const req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {
          email: ''
        }
      };
      const { token } = signToken(req);
      assert.equal(token, undefined);
      signToken(req).catch((error) => {
        assert.equal(error.statusCode, 500);
        assert.equal(error.message, 'Internal Server Error');
        done();
      });
    });

    it('it should not sign token with no email', (done) => {
      const req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {}
      };
      const { token } = signToken(req);
      assert.equal(token, undefined);
      signToken(req).catch((error) => {
        assert.equal(error.statusCode, 500);
        assert.equal(error.message, 'Internal Server Error');
        done();
      });
    });
  });
});