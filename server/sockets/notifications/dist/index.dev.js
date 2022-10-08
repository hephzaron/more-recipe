"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _models = _interopRequireDefault(require("../../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User = _models["default"].User,
    Recipe = _models["default"].Recipe,
    Notification = _models["default"].Notification;
var Op = _sequelize["default"].Op;
/**
 * @class Notifications
 * @description Gets notifications from database
 */

var Notifications =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Nofitications
   * @param {object} socket -instance of socket.io
   * @memberof Notifications
   */
  function Notifications(socket) {
    _classCallCheck(this, Notifications);

    this.socket = socket;
  }
  /**
   * @method getQueryParam
   * @description Returns query parameters
   * @param {integer} recipeId - id of recipe to be queried
   * @param {string} updatedAt - date notification was updated
   * @memberof Notifications
   * @returns {object} query parameters
   */


  _createClass(Notifications, [{
    key: "saveNotification",

    /**
     * saveNotification
     * @param {object} data
     * @memberof Notifications
     * @returns { undefined }
     */
    value: function saveNotification(data) {
      var _this = this;

      var userId = data.userId,
          recipeId = data.recipeId,
          recipientId = data.recipientId,
          notificationType = data.notificationType;
      return Notification.findOne({
        where: {
          userId: userId,
          recipeId: recipeId,
          recipientId: recipientId,
          notificationType: notificationType
        }
      }).then(function (notification) {
        if (!notification) {
          return Notification.create(data).then(function (newNotification) {
            if (!newNotification) return {};
            return JSON.parse(JSON.stringify(newNotification));
          })["catch"](function (error) {
            var name = error.name,
                message = error.message;

            _this.socket.emit('error', {
              name: name,
              message: message
            });

            return {};
          });
        }

        return Notification.update(data, {
          returning: true,
          where: {
            id: notification.id
          }
        }).then(function (updatedNotification) {
          return JSON.parse(JSON.stringify(updatedNotification[1][0]));
        });
      })["catch"](function (error) {
        var name = error.name,
            message = error.message;

        _this.socket.emit('error', {
          name: name,
          message: message
        });

        return error;
      });
    }
    /**
     * fetchNotifications
     * @param {object} options
     * @memberof Notifications
     * @returns { event } notifications
     */

  }, {
    key: "fetchRecipeNotifications",
    value: function fetchRecipeNotifications(options) {
      var _this2 = this;

      var recipeIds = options.recipeIds,
          updatedAt = options.updatedAt;
      var query = Notifications.getQueryParam({
        recipeIds: recipeIds,
        updatedAt: updatedAt
      });
      return Notification.findAll(query).then(function (notifications) {
        if (notifications.length !== 0) {
          var result = JSON.parse(JSON.stringify(notifications));
          _this2.notificationData = {
            notifications: result
          };
          _this2.notificationData.isNew = !!updatedAt;
          return result;
        }

        return [];
      })["catch"](function (error) {
        var name = error.name,
            message = error.message;

        _this2.socket.emit('error', {
          name: name,
          message: message
        });

        return error;
      });
    }
    /**
     * fetchUserNotifications
     * @param {object} options
     * @memberof Notifications
     * @returns { event } notifications
     */

  }, {
    key: "fetchUserNotifications",
    value: function fetchUserNotifications(options) {
      var _this3 = this;

      var userId = options.userId,
          updatedAt = options.updatedAt;
      var query = {
        where: _defineProperty({}, Op.and, [{
          userId: userId
        }, {
          recipientId: userId
        }]),
        attributes: ['id', 'recipeId']
      };
      return Notification.findAll(query).then(function (notifications) {
        if (notifications.length !== 0) {
          var result = JSON.parse(JSON.stringify(notifications));
          var recipeIds = result.map(function (obj) {
            return obj.recipeId;
          });
          return _this3.fetchRecipeNotifications({
            recipeIds: recipeIds,
            updatedAt: updatedAt
          });
        }

        return [];
      })["catch"](function (error) {
        var name = error.name,
            message = error.message;

        _this3.socket.emit('error', {
          name: name,
          message: message
        });

        return error;
      });
    }
    /**
     * @method sendNotification
     * @memberof Notifications
     * @param { number } socketId
     * @returns {undefined}
     */

  }, {
    key: "sendNotification",
    value: function sendNotification(socketId) {
      this.socket.to(socketId).emit('event:notifyContributors', this.notificationData);
    }
  }], [{
    key: "getQueryParam",
    value: function getQueryParam(_ref) {
      var recipeIds = _ref.recipeIds,
          updatedAt = _ref.updatedAt;
      return {
        where: {
          recipeId: _defineProperty({}, Op["in"], recipeIds),
          updatedAt: updatedAt ? _defineProperty({}, Op.gte, updatedAt) : {}
        },
        order: [['updatedAt', 'DESC']],
        limit: 5,
        include: [{
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhotoUrl']
        }, {
          model: Recipe,
          attributes: ['id', 'name', 'photoUrl']
        }, {
          model: User,
          as: 'creator',
          attributes: ['id', 'username', 'firstName', 'lastName', 'profilePhotoUrl']
        }]
      };
    }
  }]);

  return Notifications;
}();

var _default = Notifications;
exports["default"] = _default;