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

    socket.on('event:join', (client) => {
      onlineUsers.set(socket.id, client);
      console.log(`⚡: ${socket.id} joined in`);
      fetchUserNotifications.call(notifications, {
        socketId: socket.id,
        recipientId: client.userId,
        updatedAt: client.updatedAt || null
      });
    });

    socket.on('event:recipeLiked', async(data) => {
      const notification = saveNotification.call(notifications, data);
      await notification
        .then((recipeData) => {
          if (recipeData) {
            const recipeNotifications = recipeData.notification.Notifications;
            const recipientId = recipeData.notification.userId;
            const contributors = recipeNotifications.map(recipeNotification => (
              recipeNotification.userId));

            contributors.push(recipientId);
            onlineUsers.forEach((client, socketId) => {
              if (contributors.includes(client.userId)) {
                notifyContributors.call(notifications, socketId);
              }
            });
          }
          return false;
        })
        .catch(error => socket.emit('error', error));
    });

    socket.on('event:reviewAdded', async(data) => {
      const notification = saveNotification.call(notifications, data);
      await notification
        .then((savedNotification) => {
          if (savedNotification && savedNotification.length > 0) {
            savedNotification
              .map(review => recipients.push(review.user));
          }
          return false;
        })
        .catch(error => socket.emit('error', error));

      await onlineUsers.forEach((client, socketId) => {
        const { userId } = client;
        const clientIndex = _.findIndex(recipients, { id: userId });
        if (clientIndex >= 0) {
          notifyContributors.call(notifications, socketId);
        }
      });
    });
    socket.on('error', error => console.log('socket error :', error));
  });
};