import models from '../../models';
import { user } from './user';
import { reviews } from './review';
import { notificationData } from './notification';
import signToken from '../../helpers/signToken';

const { User, Notification, Review } = models;
const { salt, hash } = User.generateHash(user.password);

const userData = [{
  ...user,
  email: 'email1@email.com',
  salt,
  hash
}, {
  ...user,
  email: 'email2@email.com',
  salt,
  hash
}, {
  ...user,
  email: 'email3@email.com',
  salt,
  hash
}];

/**
 * truncateUserTable
 * @returns { undefined }
 */
export const truncateUserTable = () => {
  User
    .destroy({
      truncate: true,
      cascade: false
    });
};

/**
 * seedUserTable
 * @param { function} callback
 * @returns { undefined }
 */
export const seedUserTable = (callback) => {
  User.bulkCreate(userData)
    .then(() => callback());
};

/**
 * seedNotificationTable
 * @param { function } callback
 * @returns { undefined }
 */
export const seedNotificationTable = (callback) => {
  Notification.bulkCreate(notificationData)
    .then(() => callback());
};

/**
 * dropOrCreateTable
 * @param {function} callback
 * @returns { undefined }
 */
export const dropOrCreateTable = (callback) => {
  models.sequelize.sync({ force: true })
    .then(() => {
      callback();
    });
};

/**
 * generateToken
 * @param {string}  email
 * @returns {object} token and userId
 */
export const generateToken = (email) => {
  const req = {
    headers: {
      'user-agent': 'Mozilla'
    },
    body: {
      email
    }
  };
  const { token } = signToken(req);
  return {
    token,
    userId: user.id
  };
};

/**
 * getResetToken
 * @param { string } email
 * @returns {object} userObject
 */
export const getResetToken = email => User
  .find({
    where: {
      email
    }
  })
  .then(result => result);

/**
 * truncateReviewTable
 * @returns { undefined }
 */
const truncateReviewTable = () => Review
  .destroy({
    truncate: true,
    cascade: false
  });

export const seedReviewTable = () => truncateReviewTable()
  .then(() =>
    Review.bulkCreate(reviews));