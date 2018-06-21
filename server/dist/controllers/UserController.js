'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _signToken3 = require('../helpers/signToken');

var _signToken4 = _interopRequireDefault(_signToken3);

var _removekeys = require('../helpers/removekeys');

var _removekeys2 = _interopRequireDefault(_removekeys);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _Mailer = require('../helpers/Mailer');

var _Mailer2 = _interopRequireDefault(_Mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Recipe = _models2.default.Recipe,
    Review = _models2.default.Review;
var handleErrors = _ErrorHandler2.default.handleErrors;


var forgotPasswordTemplateDir = _path2.default.join(__dirname, '../helpers/emailTemplates/forgot-password.ejs');
var resetPasswordTemplateDir = _path2.default.join(__dirname, '../helpers/emailTemplates/reset-password.ejs');

_dotenv2.default.config();
/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */

var UserController = function () {
  function UserController() {
    (0, _classCallCheck3.default)(this, UserController);
  }

  (0, _createClass3.default)(UserController, null, [{
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
          salt = _ref.salt,
          hash = _ref.hash;

      var age = req.body.age || 0;
      var sex = req.body.sex || 'Male';
      var facebookOauthID = req.body.facebookOauthID || '';
      var googleOauthID = req.body.googleOauthID || '';

      if (password !== confirmPassword) {
        return res.status(400).send({
          message: 'Password does not match'
        });
      }
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
        return res.status(201).send({
          userPayload: {
            user: userObject,
            token: token
          },
          message: 'Your account has been created successfully'
        });
      }).catch(function (error) {
        var e = handleErrors(error);
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
        if (!user) {
          return res.status(404).send({
            message: 'This email does not exist. Please try again or create an account if not registered'
          });
        }
        var validPassword = user.validPassword(password);

        var _signToken2 = (0, _signToken4.default)(req),
            token = _signToken2.token;

        if (!token) {
          return res.status(500).send({
            message: 'Internal Server Error'
          });
        }
        if (!validPassword) {
          return res.status(400).send({
            message: 'Email or password incorrect'
          });
        }
        var userObject = (0, _removekeys2.default)(user.dataValues, ['salt', 'hash']);
        return res.status(200).send({
          token: token,
          user: userObject,
          message: 'Login successful'
        });
      }).catch(function (error) {
        var e = handleErrors(error);
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
    key: 'getUsers',
    value: function getUsers(req, res) {
      var userId = req.params.userId;

      return User.findAll({
        where: userId ? { id: userId } : null,
        attributes: {
          exclude: ['salt', 'hash']
        },
        order: [['updatedAt', 'DESC']],
        include: [{
          model: Recipe,
          include: [{
            model: Review
          }]
        }]
      }).then(function (users) {
        return res.status(200).send({ users: users });
      }).catch(function (error) {
        var e = handleErrors(error);
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
      var _req$body3 = req.body,
          password = _req$body3.password,
          oldPassword = _req$body3.oldPassword,
          confirmPassword = _req$body3.confirmPassword;

      if (password !== confirmPassword) {
        return res.status(400).send({
          message: 'The passwords are not the same. Please try again'
        });
      }
      return User.findById(userId, {
        attributes: {
          exclude: ['salt', 'hash']
        }
      }).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'This user does not exist'
          });
        }
        if (oldPassword && !user.validPassword(oldPassword)) {
          return res.status(400).send({
            message: 'Your password does not match the current password'
          });
        }

        var _User$generateHash = User.generateHash(password),
            salt = _User$generateHash.salt,
            hash = _User$generateHash.hash;

        return User.update(password ? {
          salt: salt,
          hash: hash
        } : (0, _extends3.default)({}, req.body), {
          where: { id: userId },
          returning: true,
          plain: true
        }).then(function () {
          if (!password) {
            return res.status(200).send({
              message: 'Your profile has been updated successfully'
            });
          }
          return res.status(200).send({
            message: 'Your password has been changed succesfully'
          });
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * sendPasswordResetLink
     * @param {object } req -request object
     * @param {object} res -response object
     * @returns { promise } user
     */

  }, {
    key: 'sendPasswordResetLink',
    value: function sendPasswordResetLink(req, res) {
      var email = req.body.email;

      return User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (!user) {
          return res.status(404).send({
            message: 'User with this email does not exist'
          });
        }
        var resetPasswordToken = _crypto2.default.randomBytes(10).toString('hex');
        // token expire in 15minutes
        var resetPasswordExpires = (0, _moment2.default)().add(15, 'minutes');
        return user.update({
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: resetPasswordExpires
        }).then(function (updatedUser) {
          if (!updatedUser) {
            return res.status(400).send({
              message: 'Your credentials could not be updated please try again'
            });
          }
          var BASE_URL = process.env.BASE_URL;

          var resetUrl = BASE_URL + '/auth/reset_password?token=' + resetPasswordToken;
          var username = updatedUser.username;

          var mailer = new _Mailer2.default();
          var EMAIL_FROM = process.env.EMAIL_FROM;

          _ejs2.default.renderFile(forgotPasswordTemplateDir, {
            date: (0, _moment2.default)().format('MMM Do YYYY'),
            username: username,
            resetUrl: resetUrl
          }, function (error, html) {
            if (error) {
              return error.message;
            }
            mailer.to = email;
            mailer.from = EMAIL_FROM;
            mailer.subject = 'Password reset request';
            mailer.html = html;
            mailer.send();
          });
          return res.status(200).send({
            message: 'A password reset link has been sent to ' + email + '. It may take upto 5 mins for the mail to arrive.'
          });
        }).catch(function (error) {
          var e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }

    /**
     * @method resetPassword
     * @param { object } req -request object
     * @param {object} res -response object
     * @returns { object } response
     */

  }, {
    key: 'resetPassword',
    value: function resetPassword(req, res) {
      var _req$body4 = req.body,
          password = _req$body4.password,
          confirmPassword = _req$body4.confirmPassword,
          email = _req$body4.email;

      var now = (0, _moment2.default)();
      var resetPasswordToken = req.query.token;
      if (!resetPasswordToken) {
        return res.status(403).send({
          message: 'You are not authorize to perform this action'
        });
      }
      if (password !== confirmPassword) {
        return res.status(400).send({
          message: 'Password does not match'
        });
      }
      return User.findOne({
        where: {
          email: email,
          resetPasswordToken: resetPasswordToken,
          resetPasswordExpires: { $gte: now }
        }
      }).then(function (user) {
        if (!user) {
          return res.status(400).send({
            message: 'There was an error completing your request. Perhaps, you followed a broken link.'
          });
        }

        var _User$generateHash2 = User.generateHash(password),
            salt = _User$generateHash2.salt,
            hash = _User$generateHash2.hash;

        return user.update({ salt: salt, hash: hash }).then(function (updatedUser) {
          if (!updatedUser) {
            return res.status(400).send({
              message: 'Sorry password could not be changed. Please try again'
            });
          }
          var username = updatedUser.username;

          var mailer = new _Mailer2.default();
          var EMAIL_FROM = process.env.EMAIL_FROM;

          _ejs2.default.renderFile(resetPasswordTemplateDir, {
            date: (0, _moment2.default)().format('MMM Do YYYY'),
            username: username
          }, function (error, html) {
            if (error) {
              return error.message;
            }
            mailer.to = email;
            mailer.from = EMAIL_FROM;
            mailer.subject = 'Password reset request';
            mailer.html = html;
            mailer.send();
          });
          return res.status(200).send({
            message: 'Password successfully changed. Please login to your account.'
          });
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);
  return UserController;
}();

exports.default = UserController;