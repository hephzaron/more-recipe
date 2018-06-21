'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _ErrorHandler = require('./ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var secret = process.env.JWT_SECRET;

/**
 * Generate unique identifier
 * @param { null } void
 * @returns { object } date object
 */
function generateGUID() {
  var now = new Date().getTime();
  return now;
}

/**
 * Sign user payload
 * @param { object } req -request object
 * @returns { object } token- signed token
 */

exports.default = function (req) {
  if (!secret || !req || !req.body.email || req.body.email.length === 0) {
    return _promise2.default.reject(_ErrorHandler2.default.handleErrors({}));
  }
  var GUID = generateGUID();
  var expiresDefault = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60;
  var payload = {
    auth: GUID,
    agent: req.headers['user-agent'],
    exp: expiresDefault,
    email: req.body.email
  };

  var token = _jsonwebtoken2.default.sign(payload, secret, { algorithm: 'HS256' });
  return {
    token: token
  };
};