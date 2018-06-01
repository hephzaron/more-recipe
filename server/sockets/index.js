import _ from 'lodash';
import Notifications from './notifications';
/**
 * @returns {undefined}
 * @param {object} io
 */
export default (io) => {
  const onlineUsers = new Map();
  const recipients = [];
  io.on('connection', (socket) => {
    const notifications = new Notifications(io);
    const {
      fetchUserNotifications,
      saveNotification,
      notifyContributors
    } = notifications;

    socket.on('JOIN', (client) => {
      onlineUsers.set(socket.id, client);
      fetchUserNotifications({
        socketId: socket.id,
        recipientId: client.userId,
        updatedAt: client.updatedAt || null
      });
    });

    socket.on('REVIEW_ADDED', async(data) => {
      const notification = saveNotification(data);

      await notification
        .then((savedNotification) => {
          savedNotification
            .map(review => recipients.push(review.user));
        })
        .catch(error => socket.emit('error', error));

      await onlineUsers.forEach((client, socketId) => {
        const { userId } = client;
        const clientIndex = _.findIndex(recipients, { id: userId });
        if (clientIndex >= 0) {
          notifyContributors(socketId);
        }
      });
    });
    socket.on('error', error => console.log(error));
  });
};