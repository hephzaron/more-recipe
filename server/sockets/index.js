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
      fetchRecipeNotifications,
      saveNotification,
      sendNotification
    } = notifications;

    socket.on('event:join', (client) => {
      onlineUsers.set(socket.id, client);
    });

    socket.on('event:recipeLiked', async(data) => {
      const notification = saveNotification.call(notifications, data);
      await notification
        .then((notificationData) => {
          if (notificationData) {
            const { recipeId, updatedAt } = notificationData;
            return fetchRecipeNotifications
              .call(notifications, { recipeIds: [recipeId], updatedAt })
              .then((recipeNotifications) => {
                const contributors = recipeNotifications.map(recipeNotification => (
                  recipeNotification.userId));
                contributors.push(notificationData.recipientId);

                onlineUsers.forEach((client, socketId) => {
                  if (contributors.includes(client.userId)) {
                    sendNotification.call(notifications, socketId);
                  }
                });
              })
              .catch(error => socket.emit('error', error));
          }
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
          fetchRecipeNotifications.call(notifications, socketId);
        }
      });
    });
    socket.on('error', error => console.log('socket error :', error));
  });
};