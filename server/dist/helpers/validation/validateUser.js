'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _removekeys = require('../removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate user entries
 * @param { object } user
 * @returns { object } isValid and errors
 */
var validateUser = function validateUser(user) {
  var email = user.email,
      age = user.age,
      sex = user.sex,
      salt = user.salt,
      hash = user.hash,
      facebookOauthID = user.facebookOauthID,
      googleOauthID = user.googleOauthID;

  var errors = {};
  var isAlphaNumeric = /^\w*$/i;
  var isEmail = /@\w*(.com)$/i;
  if (!salt || !hash || !facebookOauthID || !googleOauthID) {
    Object.keys(user).forEach(function (key) {
      if ((0, _lodash.isEmpty)(user[key.toString()])) {
        errors[key.toString()] = key + ' cannot be empty';
      }
      if (!isAlphaNumeric.test(user[key.toString()]) && key.toString() !== 'email' && key.toString() !== 'age') {
        errors[key.toString()] = key + ' must be alphanumeric';
      }
    });
    if (!isEmail.test(email)) {
      errors.email = 'This is not an email';
    }
    if (Number.isNaN(age)) {
      errors.age = 'Age is not a number';
    }
    if (!/^(male||female)$/i.test(sex)) {
      errors.sex = 'Sex must be a male or female';
    }
  }
  var object = (0, _removekeys2.default)(errors, ['salt', 'hash', 'facebookOauthID', 'googleOauthID']);
  return {
    isValid: (0, _lodash.isEmpty)(errors),
    errors: object
  };
};

exports.default = validateUser;