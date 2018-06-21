'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _signToken4 = require('../../../helpers/signToken');

var _signToken5 = _interopRequireDefault(_signToken4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


describe('Sign Token', function () {
  /**
   * @function Valid entries suite
   */
  describe('# Valid entries', function () {
    it('it should sign token', function () {
      var req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {
          email: 'email'
        }
      };

      var _signToken = (0, _signToken5.default)(req),
          token = _signToken.token;

      assert.equal(typeof token === 'undefined' ? 'undefined' : (0, _typeof3.default)(token), 'string');
    });
  });

  /**
   * @function Invalid entries suite
   */
  describe('# Invalid Entries', function () {
    it('it should not sign token with empty email', function (done) {
      var req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {
          email: ''
        }
      };

      var _signToken2 = (0, _signToken5.default)(req),
          token = _signToken2.token;

      assert.equal(token, undefined);
      (0, _signToken5.default)(req).catch(function (error) {
        assert.equal(error.statusCode, 500);
        assert.equal(error.message, 'Internal Server Error');
        done();
      });
    });

    it('it should not sign token with no email', function (done) {
      var req = {
        headers: {
          'user-agent': 'Mozilla'
        },
        body: {}
      };

      var _signToken3 = (0, _signToken5.default)(req),
          token = _signToken3.token;

      assert.equal(token, undefined);
      (0, _signToken5.default)(req).catch(function (error) {
        assert.equal(error.statusCode, 500);
        assert.equal(error.message, 'Internal Server Error');
        done();
      });
    });
  });
});