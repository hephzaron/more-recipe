'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inMemory = require('../helpers/in-memory');

var _passwordHash = require('../helpers/passwordHash');

var _signToken3 = require('../helpers/signToken');

var _signToken4 = _interopRequireDefault(_signToken3);

var _removekeys = require('../helpers/removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */
var UserController = function (_UserClass) {
  _inherits(UserController, _UserClass);

  function UserController() {
    _classCallCheck(this, UserController);

    return _possibleConstructorReturn(this, (UserController.__proto__ || Object.getPrototypeOf(UserController)).apply(this, arguments));
  }

  _createClass(UserController, [{
    key: 'signup',

    /**
     * Registers a new user
     * @method signup
     * @memberof UserController
     * @param {object} req -request object
     * @param {object} res -response object
     * @returns { promise } response
     */
    value: function signup(req, res) {
      var _req$body = req.body,
          password = _req$body.password,
          confirmPassword = _req$body.confirmPassword;

      var firstName = req.body.firstName || '';
      var lastName = req.body.lastName || '';
      var email = req.body.email || '';
      var username = req.body.username || '';
      var age = req.body.age || 0;
      var sex = req.body.sex || 'Male';
      var facebookOauthID = req.body.facebookOauthID || '';
      var googleOauthID = req.body.googleOauthID || '';

      if (password !== confirmPassword) {
        return res.status(400).send({
          message: 'Password does not match'
        });
      }

      return _get(UserController.prototype.__proto__ || Object.getPrototypeOf(UserController.prototype), 'create', this).call(this, {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        username: username,
        age: age,
        sex: sex,
        facebookOauthID: facebookOauthID,
        googleOauthID: googleOauthID
      }).then(function (user) {
        var _signToken = (0, _signToken4.default)(req),
            token = _signToken.token;

        if (!token) {
          return res.status(500).send({
            message: 'Internal Server Error'
          });
        }
        return res.status(201).send({
          userPayload: {
            user: user,
            token: token
          },
          message: 'Your account has been created successfully'
        });
      }).catch(function (error) {
        if (Object.keys(error).length >= 1 && !error.statusCode) {
          return res.status(400).send({
            errors: _extends({}, error)
          });
        }
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }

    /**
     * Login a user
     * @method login
     * @memberof UserController
     * @param {object} req -request object
     * @param {object} res -response object
     * @returns { null } void
     */

  }, {
    key: 'login',
    value: function login(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _get(UserController.prototype.__proto__ || Object.getPrototypeOf(UserController.prototype), 'findOne', this).call(this, {
        where: { email: email }
      }).then(function (user) {
        var _verifyPassword = (0, _passwordHash.verifyPassword)(password, user.salt, user.hash),
            validPassword = _verifyPassword.validPassword;

        var _signToken2 = (0, _signToken4.default)(req),
            token = _signToken2.token;

        if (!token) {
          return res.status(500).send({
            message: 'Internal Server Error'
          });
        }
        if (!user) {
          return res.status(400).send({
            message: 'Email or password incorrect'
          });
        }
        if (!validPassword) {
          return res.status(400).send({
            message: 'Email or password incorrect'
          });
        }
        var userObject = (0, _removekeys2.default)(user, ['salt', 'hash']);
        return res.status(200).send({
          token: token,
          user: userObject,
          message: 'Login successful'
        });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }

    /**
     * Get all user
     * @param { object } req -request
     * @param { object } res -response
     * @return { promise } response
     */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(req, res) {
      _get(UserController.prototype.__proto__ || Object.getPrototypeOf(UserController.prototype), 'list', this).call(this).then(function (users) {
        return res.status(200).send({ users: users });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }

    /**
     * Edit a user
     * @param {object} req -request
     * @param { object } res -response
     * @returns { object } response
     */

  }, {
    key: 'editUser',
    value: function editUser(req, res) {
      var userId = req.params.userId;

      _get(UserController.prototype.__proto__ || Object.getPrototypeOf(UserController.prototype), 'update', this).call(this, { user: req.body, userId: userId }).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'Oops! User details could not be updated'
          });
        }
        return res.status(200).send({ user: user });
      }).catch(function (error) {
        return res.status(error.statusCode).send({
          message: error.message
        });
      });
    }
  }]);

  return UserController;
}(_inMemory.User);

exports.default = UserController;