'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyPassword = exports.hashPassword = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Hash password to be stored in database
 * @param { string } password - User password
 * @returns { object } salt and hash
 */
var hashPassword = exports.hashPassword = function hashPassword(password) {
  var salt = _crypto2.default.randomBytes(16).toString('hex');
  var hash = _crypto2.default.pbkdf2Sync(password, salt, 1000, 64, 'SHA256').toString('hex');
  return {
    salt: salt,
    hash: hash
  };
};

/**
 * Verifies password
 * @param { string } password - User password
 * @param { string } userSalt - User random string saved on database
 * @param { string } userHash  - User hashed password saved on database
 * @returns { boolean } validPassword
 */

var verifyPassword = exports.verifyPassword = function verifyPassword(password, userSalt, userHash) {
  var validPassword = false;
  if (password && userSalt && userHash) {
    var hash = _crypto2.default.pbkdf2Sync(password, userSalt, 1000, 64, 'SHA256').toString('hex');
    if (hash === userHash) {
      validPassword = true;
    }
  }
  return {
    validPassword: validPassword
  };
};