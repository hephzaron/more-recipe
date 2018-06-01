import Sequelize from 'sequelize';
import models from '../../models';

const {
  User,
  Recipe,
  Review,
  Notification
} = models;
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
    const {
      userId,
      recipeId,
      parentId,
      recipientId,
      notificationType
    } = data;
    return Notification
      .create({
        userId,
        recipeId,
        parentId,
        recipientId,
        notificationType
      })
      .then(notification => Review
        .findAll({
          where: {
            recipeId: notification.recipeId
          }
        })
        .then((review) => {
          this.contributionData = review;
          return review;
        }))
      .catch(error => this.socket.emit('error', error));
  }

  /**
   * fetchNotifications
   * @param {object} options
   * @memberof Notifications
   * @returns { event } notifications
   */
  fetchUserNotifications(options) {
    const { socketId, recipientId, updatedAt } = options;
    const query = {
      where: {
        recipientId,
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
        as: 'user',
        attributes: [
          'username',
          'firstName',
          'lastName',
          'profilePhotoUrl'
        ]
      }, {
        model: Recipe,
        as: 'recipe',
        attributes: [
          'name'
        ]
      }]
    };
    return Notification
      .findAll(query)
      .then((notifications) => {
        if (notifications.length !== 0) {
          this.notificationData = { notifications };
          this.notificationData.isNew = !!updatedAt;
          this.sendNotification(socketId);
        }
      })
      .catch(error => this.socket.emit('error', error));
  }

  /**
   * @method sendNotification
   * @memberof Notifications
   * @param { object } socketId
   * @returns {undefined}
   */
  sendNotification(socketId) {
    this.socket.broadcast.to(socketId).emit('NEW_NOTIFICATIONS', this.notificationData);
  }

  /**
   * @method notifyContributors
   * @param {number } socketId
   * @memberof Notifications
   * @returns {undefined}
   */
  notifyContributors(socketId) {
    this.socket.broadcast.to(socketId).emit('NOTIFY_CONTRIBUTORS', this.contributionData);
  }
}

export default Notifications;