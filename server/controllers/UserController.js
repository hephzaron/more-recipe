import path from 'path';
import crypto from 'crypto';
import dotEnv from 'dotenv';
import moment from 'moment';
import ejs from 'ejs';
import models from '../models';
import signToken from '../helpers/signToken';
import removeKeys from '../helpers/removekeys';
import ErrorHandler from '../helpers/ErrorHandler';
import Mailer from '../helpers/Mailer';

const { User, Recipe, Review } = models;
const { handleErrors } = ErrorHandler;

const forgotPasswordTemplateDir = path.join(__dirname, '../helpers/emailTemplates/forgot-password.ejs');
const resetPasswordTemplateDir = path.join(__dirname, '../helpers/emailTemplates/reset-password.ejs');

dotEnv.config();
/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */
class UserController {
  /**
   * Registers a new user
   * @method signup
   * @memberof UserController
   * @param {object} req -request object
   * @param {object} res -response object
   * @returns { promise } response
   */
  static signup(req, res) {
    const { password, confirmPassword } = req.body;
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const email = req.body.email || '';
    const username = req.body.username || '';
    const { salt, hash } = User.generateHash(password) || '';
    const age = req.body.age || 0;
    const sex = req.body.sex || 'Male';
    const facebookOauthID = req.body.facebookOauthID || '';
    const googleOauthID = req.body.googleOauthID || '';

    if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'Password does not match'
      });
    }
    return User.create({
      firstName,
      lastName,
      email,
      username,
      salt,
      hash,
      age,
      sex,
      facebookOauthID,
      googleOauthID
    }).then((user) => {
      const { token } = signToken(req);
      if (!token) {
        return res.status(500).send({
          message: 'Internal Server Error'
        });
      }
      const userObject = removeKeys(user.dataValues, ['salt', 'hash']);
      return res.status(201).send({
        userPayload: {
          user: userObject,
          token
        },
        message: 'Your account has been created successfully'
      });
    }).catch((error) => {
      const e = handleErrors(error);
      return res.status(e.statusCode).send({
        message: e.message
      });
    });
  }

  /**
   * Login a user
   * @method login
   * @memberof UserController
   * @param {object} req -request object
   * @param {object} res -response object
   * @returns { null } void
   */
  static login(req, res) {
    const {
      email,
      password
    } = req.body;
    return User.findOne({
      where: { email }
    }).then((user) => {
      if (!user) {
        return res.status(404)
          .send({
            message: 'This email does not exist. Please try again or create an account if not registered'
          });
      }
      const validPassword = user.validPassword(password);
      const { token } = signToken(req);
      if (!token) {
        return res.status(500).send({
          message: 'Internal Server Error'
        });
      }
      if (!validPassword) {
        return res.status(400).send({
          message: 'Email or password incorrect'
        });
      }
      const userObject = removeKeys(user.dataValues, ['salt', 'hash']);
      return res.status(200).send({
        token,
        user: userObject,
        message: 'Login successful'
      });
    }).catch((error) => {
      const e = handleErrors(error);
      return res.status(e.statusCode).send({
        message: e.message
      });
    });
  }

  /**
   * Get all user
   * @param { object } req -request
   * @param { object } res -response
   * @return { promise } response
   */
  static getUsers(req, res) {
    const { userId } = req.params;
    return User
      .findAll({
        where: userId ? { id: userId } : null,
        attributes: {
          exclude: ['salt', 'hash']
        },
        order: [
          ['updatedAt', 'DESC']
        ],
        include: [{
          model: Recipe,
          include: [{
            model: Review
          }]
        }]
      })
      .then((users) => {
        if (users.length === 1) {
          return res.status(200).send({
            user: users[0]
          });
        }
        return res.status(200).send({ users });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Edit a user
   * @param {object} req -request
   * @param { object } res -response
   * @returns { object } response
   */
  static editUser(req, res) {
    const { userId } = req.params;
    const { password, oldPassword, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'The passwords are not the same. Please try again'
      });
    }
    return User
      .findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'This user does not exist'
          });
        }
        if (oldPassword && !user.validPassword(oldPassword)) {
          return res.status(400).send({
            message: 'Your password does not match the current password'
          });
        }
        const { salt, hash } = User.generateHash(password);
        return User
          .update(password ? {
            salt,
            hash
          } : {
            ...req.body
          }, {
            where: { id: userId },
            returning: true,
            plain: true
          })
          .then(() => {
            if (!password) {
              return res.status(200).send({
                message: 'Your profile has been updated successfully'
              });
            }
            return res.status(200).send({
              message: 'Your password has been changed succesfully'
            });
          })
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * sendPasswordResetLink
   * @param {object } req -request object
   * @param {object} res -response object
   * @returns { promise } user
   */
  static sendPasswordResetLink(req, res) {
    const { email } = req.body;
    return User
      .findOne({
        where: {
          email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User with this email does not exist'
          });
        }
        const resetPasswordToken = crypto.randomBytes(10).toString('hex');
        // token expire in 15minutes
        const resetPasswordExpires = moment().add(15, 'minutes');
        return user
          .update({
            resetPasswordToken,
            resetPasswordExpires
          })
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(400).send({
                message: 'Your credentials could not be updated please try again'
              });
            }
            const { CLIENT_URL, EMAIL_FROM } = process.env;
            const resetUrl = `${CLIENT_URL}/auth/reset_password?token=${resetPasswordToken}`;
            const { username } = updatedUser;
            const mailer = new Mailer();
            ejs.renderFile(forgotPasswordTemplateDir, {
              date: moment().format('MMM Do YYYY'),
              username,
              resetUrl
            }, (error, html) => {
              if (error) {
                return error.message;
              }
              mailer.to = email;
              mailer.from = EMAIL_FROM;
              mailer.subject = 'Password reset request';
              mailer.html = html;
              mailer.send();
            });
            return res.status(200).send({
              message: `A password reset link has been sent to ${email}. It may take upto 5 mins for the mail to arrive.`
            });
          })
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * @method resetPassword
   * @param { object } req -request object
   * @param {object} res -response object
   * @returns { object } response
   */
  static resetPassword(req, res) {
    const { password, confirmPassword, email } = req.body;
    console.log(req.body);
    const now = moment();
    const resetPasswordToken = req.query.token;
    if (!resetPasswordToken) {
      return res.status(403).send({
        message: 'You are not authorize to perform this action'
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'Password does not match'
      });
    }
    return User
      .findOne({
        where: {
          email,
          resetPasswordToken,
          resetPasswordExpires: { $gte: now }
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            message: 'There was an error completing your request. Perhaps, you followed a broken link.'
          });
        }
        const { salt, hash } = User.generateHash(password);
        return user
          .update({ salt, hash })
          .then((updatedUser) => {
            if (!updatedUser) {
              return res.status(400).send({
                message: 'Sorry password could not be changed. Please try again'
              });
            }
            const { username } = updatedUser;
            const mailer = new Mailer();
            const { EMAIL_FROM } = process.env;
            ejs.renderFile(resetPasswordTemplateDir, {
              date: moment().format('MMM Do YYYY'),
              username
            }, (error, html) => {
              if (error) {
                return error.message;
              }
              mailer.to = email;
              mailer.from = EMAIL_FROM;
              mailer.subject = 'Password reset request';
              mailer.html = html;
              mailer.send();
            });
            return res.status(200).send({
              message: 'Password successfully changed. Please login to your account.'
            });
          });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default UserController;