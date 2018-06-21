'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Recipe = _models2.default.Recipe,
    Review = _models2.default.Review,
    Notification = _models2.default.Notification;
var Op = _sequelize2.default.Op;

/**
 * @class Notifications
 * @description Gets notifications from database
 */

var Notifications = function () {
  /**
   * Creates an instance of Nofitications
   * @param {object} socket -instance of socket.io
   * @memberof Notifications
   */
  function Notifications(socket) {
    (0, _classCallCheck3.default)(this, Notifications);

    this.socket = socket;
  }

  /**
   * saveNotification
   * @param {object} data
   * @memberof Notifications
   * @returns { undefined }
   */


  (0, _createClass3.default)(Notifications, [{
    key: 'saveNotification',
    value: function saveNotification(data) {
      var _this = this;

      var userId = data.userId;

      return Notification.create(data).then(function (notification) {
        if (!notification) return {};
        return Review.findAll({
          where: (0, _defineProperty3.default)({
            recipeId: notification.recipeId
          }, Op.not, {
            userId: userId
          })
        }).then(function (review) {
          if (!review) return;
          _this.contributionData = review;
          return review;
        }).catch(function (error) {
          var name = error.name,
              message = error.message;

          _this.socket.emit('error', { name: name, message: message });
          return {};
        });
      }).catch(function (error) {
        var name = error.name,
            message = error.message;

        _this.socket.emit('error', { name: name, message: message });
        return {};
      });
    }

    /**
     * fetchNotifications
     * @param {object} options
     * @memberof Notifications
     * @returns { event } notifications
     */

  }, {
    key: 'fetchUserNotifications',
    value: function fetchUserNotifications(options) {
      var _this2 = this;

      var recipientId = options.recipientId,
          updatedAt = options.updatedAt;

      var query = {
        where: {
          recipientId: recipientId,
          updatedAt: updatedAt ? (0, _defineProperty3.default)({}, Op.gte, updatedAt) : {}
        },
        order: [['updatedAt', 'DESC']],
        limit: 5,
        include: [{
          model: User,
          attributes: ['username', 'firstName', 'lastName', 'profilePhotoUrl']
        }, {
          model: Recipe,
          attributes: ['name']
        }]
      };
      return Notification.findAll(query).then(function (notifications) {
        if (notifications.length !== 0) {
          _this2.notificationData = { notifications: notifications };
          _this2.notificationData.isNew = !!updatedAt;
          _this2.sendNotification();
        }
        return false;
      }).catch(function (error) {
        var name = error.name,
            message = error.message;

        _this2.socket.emit('error', { name: name, message: message });
      });
    }

    /**
     * @method sendNotification
     * @memberof Notifications
     * @param { object } socketId
     * @returns {undefined}
     */

  }, {
    key: 'sendNotification',
    value: function sendNotification() {
      this.socket.emit('NEW_NOTIFICATIONS', this.notificationData);
    }

    /**
     * @method notifyContributors
     * @param {number } socketId
     * @memberof Notifications
     * @returns {undefined}
     */

  }, {
    key: 'notifyContributors',
    value: function notifyContributors(socketId) {
      this.socket.to(socketId).emit('NOTIFY_CONTRIBUTORS', this.contributionData);
    }
  }]);
  return Notifications;
}();

exports.default = Notifications;