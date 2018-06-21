'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _notifications = require('./notifications');

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {undefined}
 * @param {object} io
 */
exports.default = function (io) {
  var onlineUsers = new _map2.default();
  var recipients = [];
  io.on('connection', function (socket) {
    var notifications = new _notifications2.default(io);
    var fetchUserNotifications = notifications.fetchUserNotifications,
        saveNotification = notifications.saveNotification,
        notifyContributors = notifications.notifyContributors;


    socket.on('JOIN', function (client) {
      onlineUsers.set(socket.id, client);
      fetchUserNotifications.call(notifications, {
        socketId: socket.id,
        recipientId: client.userId,
        updatedAt: client.updatedAt || null
      });
    });

    socket.on('REVIEW_ADDED', function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(data) {
        var notification;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                notification = saveNotification.call(notifications, data);
                _context.next = 3;
                return notification.then(function (savedNotification) {
                  if (savedNotification && savedNotification.length > 0) {
                    savedNotification.map(function (review) {
                      return recipients.push(review.user);
                    });
                  }
                  return false;
                }).catch(function (error) {
                  return socket.emit('error', error);
                });

              case 3:
                _context.next = 5;
                return onlineUsers.forEach(function (client, socketId) {
                  var userId = client.userId;

                  var clientIndex = _lodash2.default.findIndex(recipients, { id: userId });
                  if (clientIndex >= 0) {
                    notifyContributors.call(notifications, socketId);
                  }
                });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    socket.on('error', function (error) {
      return console.log('socket error :', error);
    });
  });
};