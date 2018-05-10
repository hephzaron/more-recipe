'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * @returns {undefined}
 * @param {object} io
 */
exports.default = function (io) {
  io.on('connect', function (socket) {
    socket.on('FETCH_NOTIFICATIONS', function () {});
    socket.on('JOIN', function () {
      socket.emit('FETCH_ALL_NOTIFICATIONS');
    });
  });
};