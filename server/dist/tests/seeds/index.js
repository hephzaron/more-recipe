'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedReviewTable = exports.getResetToken = exports.generateToken = exports.dropOrCreateTable = exports.seedNotificationTable = exports.seedUserTable = exports.truncateUserTable = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _user = require('./user');

var _review = require('./review');

var _notification = require('./notification');

var _signToken2 = require('../../helpers/signToken');

var _signToken3 = _interopRequireDefault(_signToken2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Notification = _models2.default.Notification,
    Review = _models2.default.Review;

var _User$generateHash = User.generateHash(_user.user.password),
    salt = _User$generateHash.salt,
    hash = _User$generateHash.hash;

var userData = [(0, _extends3.default)({}, _user.user, {
  email: 'email1@email.com',
  salt: salt,
  hash: hash
}), (0, _extends3.default)({}, _user.user, {
  email: 'email2@email.com',
  salt: salt,
  hash: hash
}), (0, _extends3.default)({}, _user.user, {
  email: 'email3@email.com',
  salt: salt,
  hash: hash
})];

/**
 * truncateUserTable
 * @returns { undefined }
 */
var truncateUserTable = exports.truncateUserTable = function truncateUserTable() {
  User.destroy({
    truncate: true,
    cascade: false
  });
};

/**
 * seedUserTable
 * @param { function} callback
 * @returns { undefined }
 */
var seedUserTable = exports.seedUserTable = function seedUserTable(callback) {
  User.bulkCreate(userData).then(function () {
    return callback();
  });
};

/**
 * seedNotificationTable
 * @param { function } callback
 * @returns { undefined }
 */
var seedNotificationTable = exports.seedNotificationTable = function seedNotificationTable(callback) {
  Notification.bulkCreate(_notification.notificationData).then(function () {
    return callback();
  });
};

/**
 * dropOrCreateTable
 * @param {function} callback
 * @returns { undefined }
 */
var dropOrCreateTable = exports.dropOrCreateTable = function dropOrCreateTable(callback) {
  _models2.default.sequelize.sync({ force: true }).then(function () {
    callback();
  });
};

/**
 * generateToken
 * @param {string}  email
 * @returns {object} token and userId
 */
var generateToken = exports.generateToken = function generateToken(email) {
  var req = {
    headers: {
      'user-agent': 'Mozilla'
    },
    body: {
      email: email
    }
  };

  var _signToken = (0, _signToken3.default)(req),
      token = _signToken.token;

  return {
    token: token,
    userId: _user.user.id
  };
};

/**
 * getResetToken
 * @param { string } email
 * @returns {object} userObject
 */
var getResetToken = exports.getResetToken = function getResetToken(email) {
  return User.find({
    where: {
      email: email
    }
  }).then(function (result) {
    return result;
  });
};

/**
 * truncateReviewTable
 * @returns { undefined }
 */
var truncateReviewTable = function truncateReviewTable() {
  return Review.destroy({
    truncate: true,
    cascade: false
  });
};

var seedReviewTable = exports.seedReviewTable = function seedReviewTable() {
  return truncateReviewTable().then(function () {
    return Review.bulkCreate(_review.reviews);
  });
};