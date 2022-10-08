"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _notifications = _interopRequireDefault(require("./notifications"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @returns {undefined}
 * @param {object} io
 */
var _default = function _default(io) {
  var onlineUsers = new Map();
  var recipients = [];
  io.on('connection', function (socket) {
    var notifications = new _notifications["default"](io);
    var fetchRecipeNotifications = notifications.fetchRecipeNotifications,
        fetchUserNotifications = notifications.fetchUserNotifications,
        saveNotification = notifications.saveNotification,
        sendNotification = notifications.sendNotification;
    socket.on('event:join', function _callee(client) {
      var userId, updatedAt, notificationList;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onlineUsers.set(socket.id, client);
              console.log("\u26A1 \uD83D\uDD25 ".concat(socket.id, " ").concat(client.userId, " ").concat(client.updatedAt, " is logged in"));
              userId = client.userId, updatedAt = client.updatedAt;
              notificationList = fetchUserNotifications.call(notifications, {
                userId: userId,
                updatedAt: updatedAt
              });
              _context.next = 6;
              return regeneratorRuntime.awrap(notificationList.then(function (result) {
                if (result) {
                  return sendNotification.call(notifications, socket.id);
                }
              }));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    socket.on('event:recipeLiked', function _callee2(data) {
      var notification;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              notification = saveNotification.call(notifications, data);
              _context2.next = 3;
              return regeneratorRuntime.awrap(notification.then(function (notificationData) {
                if (notificationData) {
                  var recipeId = notificationData.recipeId,
                      updatedAt = notificationData.updatedAt;
                  return fetchRecipeNotifications.call(notifications, {
                    recipeIds: [recipeId],
                    updatedAt: updatedAt
                  }).then(function (recipeNotifications) {
                    var contributors = recipeNotifications.map(function (recipeNotification) {
                      return recipeNotification.userId;
                    });
                    contributors.push(notificationData.recipientId);
                    onlineUsers.forEach(function (client, socketId) {
                      if (contributors.includes(client.userId)) {
                        sendNotification.call(notifications, socketId);
                      }
                    });
                  })["catch"](function (error) {
                    return socket.emit('error', error);
                  });
                }
              })["catch"](function (error) {
                return socket.emit('error', error);
              }));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
    socket.on('event:reviewAdded', function _callee3(data) {
      var notification;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              notification = saveNotification.call(notifications, data);
              _context3.next = 3;
              return regeneratorRuntime.awrap(notification.then(function (savedNotification) {
                if (savedNotification && savedNotification.length > 0) {
                  savedNotification.map(function (review) {
                    return recipients.push(review.user);
                  });
                }

                return false;
              })["catch"](function (error) {
                return socket.emit('error', error);
              }));

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(onlineUsers.forEach(function (client, socketId) {
                var userId = client.userId;

                var clientIndex = _lodash["default"].findIndex(recipients, {
                  id: userId
                });

                if (clientIndex >= 0) {
                  fetchRecipeNotifications.call(notifications, socketId);
                }
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    socket.on('error', function (error) {
      return console.log('socket error :', error);
    });
  });
};

exports["default"] = _default;