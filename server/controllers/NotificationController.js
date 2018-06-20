import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';

const {
  User,
  Recipe,
  Notification
} = models;
const { handleErrors } = ErrorHandler;

/**
 * Handles notification request operations
 * @class NotificationController
 * @param {null} void
 */
class NotificationController {
  /**
   * getNotifications
   * @memberof NotificationController
   * @param { object } req
   * @param { object } res
   * @returns { object } res
   */
  static getNotifications(req, res) {
    const {
      param: {
        userId
      },
      query: {
        limit,
        offset
      }
    } = req;

    const where = userId ? {
      recipientId: userId
    } : {};
    return Notification
      .findAll({
        where,
        limit: limit || 10,
        offset: offset || 10,
        order: [
          ['updatedAt', 'DESC']
        ],
        include: [{
          model: User
        }, {
          model: Recipe
        }]
      })
      .then(notifications => res.status(200).send({
        notifications
      }))
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default NotificationController;