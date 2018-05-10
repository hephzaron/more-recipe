'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _passwordHash = require('../../../helpers/passwordHash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;


describe('Password Hash', function () {
  var password = 'password';

  it('it should return hash and salt of hashed password', function () {
    var _hashPassword = (0, _passwordHash.hashPassword)(password),
        salt = _hashPassword.salt,
        hash = _hashPassword.hash;

    global.hashedPassword = { salt: salt, hash: hash };
    assert.equal(typeof salt === 'undefined' ? 'undefined' : _typeof(salt), 'string');
    assert.equal(typeof hash === 'undefined' ? 'undefined' : _typeof(hash), 'string');
  });

  it('it should return truthy value for valid password', function () {
    var _global$hashedPasswor = global.hashedPassword,
        salt = _global$hashedPasswor.salt,
        hash = _global$hashedPasswor.hash;

    var _verifyPassword = (0, _passwordHash.verifyPassword)(password, salt, hash),
        validPassword = _verifyPassword.validPassword;

    assert.equal(typeof validPassword === 'undefined' ? 'undefined' : _typeof(validPassword), 'boolean');
    assert.equal(validPassword, true);
  });

  it('it should return falsy value for invalid password', function () {
    var _global$hashedPasswor2 = global.hashedPassword,
        salt = _global$hashedPasswor2.salt,
        hash = _global$hashedPasswor2.hash;

    var _verifyPassword2 = (0, _passwordHash.verifyPassword)(password + '-invalid', salt, hash),
        validPassword = _verifyPassword2.validPassword;

    assert.equal(typeof validPassword === 'undefined' ? 'undefined' : _typeof(validPassword), 'boolean');
    assert.equal(validPassword, false);
  });

  it('it should return falsy value for empty or incomplete param', function () {
    var _verifyPassword3 = (0, _passwordHash.verifyPassword)(password),
        validPassword = _verifyPassword3.validPassword;

    assert.equal(typeof validPassword === 'undefined' ? 'undefined' : _typeof(validPassword), 'boolean');
    assert.equal(validPassword, false);
  });
});