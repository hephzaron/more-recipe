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
    const { userId } = data;
    return Notification
      .create(data)
      .then((notification) => {
        const { notificationType, recipeId } = notification;
        if (!notification) return {};
        if (notificationType === 'Likes') {
          return Recipe
            .findAll({
              where: {
                id: recipeId
              },
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: [
                    'id',
                    'username',
                    'profilePhotoUrl'
                  ]
                },
                {
                  model: Notification,
                  where: {
                    notificationType: {
                      [Op.eq]: 'Likes'
                    }
                  }
                }
              ]
            })
            .then((recipe) => {
              if (!recipe) return;
              const recipeData = JSON.parse(JSON.stringify(recipe[0]));
              this.contributionData = { notification: recipeData };
              return { notification: recipeData };
            })
            .catch((error) => {
              const { name, message } = error;
              this.socket.emit('error', { name, message });
              return {};
            });
        }
        return Review
          .findAll({
            where: {
              recipeId,
              [Op.not]: {
                userId
              }
            }
          })
          .then((reviews) => {
            if (!reviews) return;
            const reviewData = JSON.parse(JSON.stringify(reviews));
            this.contributionData = reviewData;
            return reviews;
          })
          .catch((error) => {
            const { name, message } = error;
            this.socket.emit('error', { name, message });
            return {};
          });
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
  fetchUserNotifications(options) {
    const { recipientId, updatedAt } = options;
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
        attributes: [
          'username',
          'firstName',
          'lastName',
          'profilePhotoUrl'
        ]
      }, {
        model: Recipe,
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
          this.sendNotification();
        }
        return false;
      })
      .catch((error) => {
        const { name, message } = error;
        this.socket.emit('error', { name, message });
      });
  }

  /**
   * @method sendNotification
   * @memberof Notifications
   * @param { object } socketId
   * @returns {undefined}
   */
  sendNotification() {
    this.socket.emit('event:newNotifications', this.notificationData);
  }

  /**
   * @method notifyContributors
   * @param {number } socketId
   * @memberof Notifications
   * @returns {undefined}
   */
  notifyContributors(socketId) {
    this.socket.to(socketId).emit('event:notifyContributors', this.contributionData);
  }
}

export default Notifications;