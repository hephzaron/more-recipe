import Sequelize from 'sequelize';
import models from '../../models';

const { User, Recipe, Notification } = models;
const { Op } = Sequelize;

/**
 * @class Notifications
 * @description Gets notifications from database
 */
class Notifications {
  /**
   * Creates an instance of Nofitications
   * @param {object} socket -instance of socket.io
   * @memberof Notifications
   */
  constructor(socket) {
    this.socket = socket;
  }

  /**
   * saveNotification
   * @param {object} data
   * @memberof Notifications
   * @returns { undefined }
   */
  saveNotification(data) {
    return Notification
      .create(data)
      .then((notification) => {
        if (!notification) return {};
        return JSON.parse(JSON.stringify(notification));
      })
      .catch((error) => {
        const { name, message } = error;
        this.socket.emit('error', { name, message });
        return {};
      });
  }

  /**
   * fetchNotifications
   * @param {object} options
   * @memberof Notifications
   * @returns { event } notifications
   */
  fetchRecipeNotifications(options) {
    const { recipeId, updatedAt } = options;
    const query = {
      where: {
        recipeId,
        updatedAt: updatedAt ? {
          [Op.gte]: updatedAt
        } : {}
      },
      order: [
        ['updatedAt', 'DESC']
      ],
      limit: 5,
      include: [{
        model: User,
        attributes: [
          'id',
          'username',
          'firstName',
          'lastName',
          'profilePhotoUrl'
        ]
      }, {
        model: Recipe,
        attributes: [
          'id',
          'name',
          'photoUrl'
        ]
      }, {
        model: User,
        as: 'creator',
        attributes: [
          'id',
          'username',
          'firstName',
          'lastName',
          'profilePhotoUrl'
        ]
      }]
    };
    return Notification
      .findAll(query)
      .then((notifications) => {
        if (notifications.length !== 0) {
          console.log('length', notifications.length);
          const result = JSON.parse(JSON.stringify(notifications));
          console.log('result', result);
          this.notificationData = { notifications: result };
          this.notificationData.isNew = !!updatedAt;
          return result;
        }
        return [];
      })
      .catch((error) => {
        console.log('error', error);
        const { name, message } = error;
        this.socket.emit('error', { name, message });
        return error;
      });
  }

  /**
   * @method sendNotification
   * @memberof Notifications
   * @param { number } socketId
   * @returns {undefined}
   */
  sendNotification(socketId) {
    console.log('data', this.notificationData);
    this.socket.to(socketId).emit('event:notifyContributors', this.notificationData);
  }
}

export default Notifications;