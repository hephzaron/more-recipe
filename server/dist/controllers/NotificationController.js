'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _ErrorHandler = require('../helpers/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User,
    Recipe = _models2.default.Recipe,
    Notification = _models2.default.Notification;
var handleErrors = _ErrorHandler2.default.handleErrors;

/**
 * Handles notification request operations
 * @class NotificationController
 * @param {null} void
 */

var NotificationController = function () {
  function NotificationController() {
    (0, _classCallCheck3.default)(this, NotificationController);
  }

  (0, _createClass3.default)(NotificationController, null, [{
    key: 'getNotifications',

    /**
     * getNotifications
     * @memberof NotificationController
     * @param { object } req
     * @param { object } res
     * @returns { object } res
     */
    value: function getNotifications(req, res) {
      var userId = req.param.userId,
          _req$query = req.query,
          limit = _req$query.limit,
          offset = _req$query.offset;


      var where = userId ? {
        recipientId: userId
      } : {};
      return Notification.findAll({
        where: where,
        limit: limit || 10,
        offset: offset || 10,
        order: [['updatedAt', 'DESC']],
        include: [{
          model: User
        }, {
          model: Recipe
        }]
      }).then(function (notifications) {
        return res.status(200).send({
          notifications: notifications
        });
      }).catch(function (error) {
        var e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
    }
  }]);
  return NotificationController;
}();

exports.default = NotificationController;