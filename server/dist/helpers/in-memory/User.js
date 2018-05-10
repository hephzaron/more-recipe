'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _generateIndex2 = require('../generateIndex');

var _generateIndex3 = _interopRequireDefault(_generateIndex2);

var _passwordHash = require('../passwordHash');

var _validation = require('../validation');

var _removekeys = require('../removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

var _ErrorHandler = require('../ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * User in-memory data
 */
var User = function () {
  /**
   * Creates class instance
   * @param { null } void
   * @returns { object } Instance of Users class
   */
  function User() {
    _classCallCheck(this, User);

    this.index = 0;
    this.users = [];
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      salt: '',
      hash: '',
      email: '',
      username: '',
      age: '',
      sex: 'Male',
      facebookOauthID: '',
      googleOauthID: ''
    };
  }

  /**
   * Adds recipe to array
   * @param { object } newUser
   * @returns { promise } createdUser
   */


  _createClass(User, [{
    key: 'create',
    value: function create(newUser) {
      var _validateUser = (0, _validation.validateUser)(newUser),
          isValid = _validateUser.isValid,
          errors = _validateUser.errors;

      if (!isValid) {
        return Promise.reject(errors);
      }
      var userExists = this.users.findIndex(function (user) {
        return user.email === newUser.email;
      });
      if (userExists >= 0) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Conflict',
          message: 'User already exists'
        }));
      }
      var lastIndex = this.index;

      var _generateIndex = (0, _generateIndex3.default)({ lastIndex: lastIndex }),
          nextIndex = _generateIndex.nextIndex;

      this.index = nextIndex;

      var _hashPassword = (0, _passwordHash.hashPassword)(newUser.password),
          salt = _hashPassword.salt,
          hash = _hashPassword.hash;

      var withoutPassword = (0, _removekeys2.default)(newUser, ['password']);
      var indexedUser = _extends({
        id: nextIndex,
        salt: salt,
        hash: hash
      }, withoutPassword);
      this.user = Object.assign({}, _extends({}, this.user), indexedUser);
      this.users.push(this.user);
      if (this.users[this.users.length - 1].email !== this.user.email || !this.user) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          message: 'An error occured in creating a new user'
        }));
      }
      var withoutHash = (0, _removekeys2.default)(_extends({}, this.user), ['salt', 'hash', 'facebookOauthID', 'googleOauthID']);
      return Promise.resolve(withoutHash);
    }

    /**
     * Finds a user
     * @param { number } userId
     * @returns { promise } user
     */

  }, {
    key: 'findOne',
    value: function findOne(_ref) {
      var where = _ref.where;

      var userIndex = _lodash2.default.findIndex(this.users, _extends({}, where));
      if (userIndex === -1) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'User does not exist'
        }));
      }
      return Promise.resolve(this.users[userIndex]);
    }

    /**
     * Update a user details
     * @param { number } userId
     * @param { object } user
     * @returns { void } null
     */

  }, {
    key: 'update',
    value: function update(_ref2) {
      var _this = this;

      var user = _ref2.user,
          userId = _ref2.userId;
      var firstName = user.firstName,
          lastName = user.lastName,
          salt = user.salt,
          hash = user.hash,
          email = user.email,
          username = user.username,
          age = user.age,
          sex = user.sex,
          facebookOauthID = user.facebookOauthID,
          googleOauthID = user.googleOauthID;

      return this.findOne({ where: { id: parseInt(userId, 10) } }).then(function (userFound) {
        _this.users.splice(userFound.id - 1, 1, Object.assign({}, _extends({}, userFound), {
          firstName: firstName || userFound.firstName,
          lastName: lastName || userFound.lastName,
          salt: salt || userFound.salt,
          hash: hash || userFound.hash,
          email: email || userFound.email,
          username: username || userFound.username,
          age: age || userFound.age,
          sex: sex || userFound.sex,
          facebookOauthID: facebookOauthID || userFound.facebookOauthID,
          googleOauthID: googleOauthID || userFound.googleOauthID
        }));
        var withoutHash = (0, _removekeys2.default)(_this.users[userFound.id - 1], ['salt', 'hash']);
        return Promise.resolve(withoutHash);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }

    /**
     * Get all user
     * @param { void } null
     * @returns { promise } users
     */

  }, {
    key: 'list',
    value: function list() {
      var users = [].concat(_toConsumableArray(this.users));
      if (!this.users) {
        return Promise.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'Users list not available'
        }));
      }
      if (this.users.length === 0) {
        return Promise.resolve({ users: users, message: 'No user created yet' });
      }
      users.map(function (user) {
        return (0, _removekeys2.default)(user, ['salt', 'hash']);
      });
      return Promise.resolve(users);
    }
  }]);

  return User;
}();

exports.default = User;