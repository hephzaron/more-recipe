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
    const {
      userId, recipeId, recipientId, notificationType
    } = data;
    return Notification
      .findOne({
        where: {
          userId,
          recipeId,
          recipientId,
          notificationType
        }
      })
      .then((notification) => {
        if (!notification) {
          return Notification
            .create(data)
            .then((newNotification) => {
              if (!newNotification) return {};
              return JSON.parse(JSON.stringify(newNotification));
            })
            .catch((error) => {
              const { name, message } = error;
              this.socket.emit('error', { name, message });
              return {};
            });
        }
        return Notification
          .update(
            data,
            {
              returning: true,
              where: { id: notification.id}
            }
          )
          .then(updatedNotification => (JSON.parse(JSON.stringify(updatedNotification[1][0]))));
      })
      .catch((error) => {
        const { name, message } = error;
        this.socket.emit('error', { name, message });
        return error;
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
          const result = JSON.parse(JSON.stringify(notifications));
          this.notificationData = { notifications: result };
          this.notificationData.isNew = !!updatedAt;
          return result;
        }
        return [];
      })
      .catch((error) => {
        const { name, message } = error;
        this.socket.emit('error', { name, message });
        return error;
      });
  }

  /**
   * fetchUserNotifications
   * @param {object} options
   * @memberof Notifications
   * @returns { event } notifications
   */
  fetchUserNotifications(options) {
    const { updatedAt } = options;
    const query = {
      where: {
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
          const result = JSON.parse(JSON.stringify(notifications));
          this.notificationData = { notifications: result };
          this.notificationData.isNew = !!updatedAt;
          return result;
        }
        return [];
      })
      .catch((error) => {
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
    this.socket.to(socketId).emit('event:notifyContributors', this.notificationData);
  }
}

export default Notifications;