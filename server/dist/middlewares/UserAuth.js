'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();
/**
 * @class UserAuth
 * @description Secure routes
 * @returns { promise } - response
 */

var UserAuth = function () {
  function UserAuth() {
    _classCallCheck(this, UserAuth);
  }

  _createClass(UserAuth, null, [{
    key: 'verifyUser',

    /**
     * @memberof UserAuth
     * @method verifyUser
     * @param { object } req
     * @param { object } res
     * @param { function } next
     * @returns { promise } response
     */
    value: function verifyUser(req, res, next) {
      try {
        var token = req.headers.authorization;
        var decoded = _jsonwebtoken2.default.decode(token, process.env.JWT_SECRET, { algorithm: 'HS256' });
        /** Insert code to find user payload from user list */
        if (!decoded) {
          return res.status(401).send({
            message: 'Token invalid or expired-user not found'
          });
        }
        next();
      } catch (e) {
        return res.status(401).send({
          message: 'Token invalid or expired-user not found'
        });
      }
    }
  }]);

  return UserAuth;
}();

exports.default = UserAuth;