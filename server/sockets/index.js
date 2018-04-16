/**
 * @returns {undefined}
 * @param {object} io
 */
export default (io) => {
  io.on('connect', (socket) => {
    socket.on('FETCH_NOTIFICATIONS', (data) => {});
    socket.on('JOIN', () => {
      socket.emit('FETCH_ALL_NOTIFICATIONS');
    });
  });
};