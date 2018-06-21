'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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
    (0, _classCallCheck3.default)(this, User);

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


  (0, _createClass3.default)(User, [{
    key: 'create',
    value: function create(newUser) {
      var _validateUser = (0, _validation.validateUser)(newUser),
          isValid = _validateUser.isValid,
          errors = _validateUser.errors;

      if (!isValid) {
        return _promise2.default.reject(errors);
      }
      var userExists = this.users.findIndex(function (user) {
        return user.email === newUser.email;
      });
      if (userExists >= 0) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
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
      var indexedUser = (0, _extends3.default)({
        id: nextIndex,
        salt: salt,
        hash: hash
      }, withoutPassword);
      this.user = (0, _assign2.default)({}, (0, _extends3.default)({}, this.user), indexedUser);
      this.users.push(this.user);
      if (this.users[this.users.length - 1].email !== this.user.email || !this.user) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          message: 'An error occured in creating a new user'
        }));
      }
      var withoutHash = (0, _removekeys2.default)((0, _extends3.default)({}, this.user), ['salt', 'hash', 'facebookOauthID', 'googleOauthID']);
      return _promise2.default.resolve(withoutHash);
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

      var userIndex = _lodash2.default.findIndex(this.users, (0, _extends3.default)({}, where));
      if (userIndex === -1) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'User does not exist'
        }));
      }
      return _promise2.default.resolve(this.users[userIndex]);
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
        _this.users.splice(userFound.id - 1, 1, (0, _assign2.default)({}, (0, _extends3.default)({}, userFound), {
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
        return _promise2.default.resolve(withoutHash);
      }).catch(function (error) {
        return _promise2.default.reject(error);
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
      var users = [].concat((0, _toConsumableArray3.default)(this.users));
      if (!this.users) {
        return _promise2.default.reject(_ErrorHandler2.default.handleErrors({
          name: 'Not Found',
          message: 'Users list not available'
        }));
      }
      if (this.users.length === 0) {
        return _promise2.default.resolve({ users: users, message: 'No user created yet' });
      }
      users.map(function (user) {
        return (0, _removekeys2.default)(user, ['salt', 'hash']);
      });
      return _promise2.default.resolve(users);
    }
  }]);
  return User;
}();

exports.default = User;