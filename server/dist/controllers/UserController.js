'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _signToken3 = require('../helpers/signToken');

var _signToken4 = _interopRequireDefault(_signToken3);

var _removekeys = require('../helpers/removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = _models2.default.User;

/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
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

      var _ref = User.generateHash(password) || '',
          salt = _ref.salt;

      var _ref2 = User.generateHash(password) || '',
          hash = _ref2.hash;

      var age = req.body.age || 0;
      var sex = req.body.sex || 'Male';
      var facebookOauthID = req.body.facebookOauthID || '';
      var googleOauthID = req.body.googleOauthID || '';

      if (password !== confirmPassword) {
        return res.status(400).send({
          message: 'Password does not match'
        });
      }
      console.log('m:', Object.getOwnPropertyNames(User.prototype));
      return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        salt: salt,
        hash: hash,
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
        var userObject = (0, _removekeys2.default)(user.dataValues, ['salt', 'hash']);
        console.log('k:', Object.getOwnPropertyNames(user.dataValues));
        return res.status(201).send({
          userPayload: {
            user: userObject,
            token: token
          },
          message: 'Your account has been created successfully'
        });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
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

      return User.findOne({
        where: { email: email }
      }).then(function (user) {
        var _user$validPassword = user.validPassword(password),
            validPassword = _user$validPassword.validPassword;

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
        console.log(Object.getOwnPropertyNames(user.prototype));
        var userObject = (0, _removekeys2.default)(user.dataValues, ['salt', 'hash']);
        return res.status(200).send({
          token: token,
          user: userObject,
          message: 'Login successful'
        });
      }).catch(function (error) {
        console.log(error.name, error.message);
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
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
      return User.list().then(function (users) {
        return res.status(200).send({ users: users });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
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

      return User.update({ user: req.body, userId: userId }).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'Oops! User details could not be updated'
          });
        }
        return res.status(200).send({ user: user });
      }).catch(function (error) {
        var e = _ErrorHandler2.default.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;