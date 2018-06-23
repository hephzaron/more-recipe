'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
var handleErrors = _ErrorHandler2.default.handleErrors;

_dotenv2.default.config();
/**
 * @class UserAuth
 * @description Secure routes
 * @returns { promise } - response
 */

var UserAuth = function () {
  function UserAuth() {
    (0, _classCallCheck3.default)(this, UserAuth);
  }

  (0, _createClass3.default)(UserAuth, null, [{
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
      var userId = req.params.userId;
      var _req$body = req.body,
          upVotes = _req$body.upVotes,
          downVotes = _req$body.downVotes,
          likes = _req$body.likes,
          dislikes = _req$body.dislikes;

      try {
        var token = req.headers.authorization;
        var decoded = _jsonwebtoken2.default.decode(token, process.env.JWT_SECRET, { algorithm: 'HS256' });
        /** Insert code to find user payload from user list */
        if (!decoded) {
          return res.status(401).send({
            message: 'You are not authorized to perform this action'
          });
        }
        var email = decoded.email;

        User.findOne({
          where: { email: email }
        }).then(function (user) {
          if (!user) {
            return res.status(404).send({
              message: 'Token invalid or expired-user not found'
            });
          }
          if (userId && (!(upVotes || downVotes || likes || dislikes) || (upVotes || downVotes || likes || dislikes) && req.method !== 'PUT') && parseInt(userId, 10) !== user.id) {
            return res.status(401).send({
              message: 'You are not authorized to access this account'
            });
          }
          next();
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
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