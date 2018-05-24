import models from '../models';
import signToken from '../helpers/signToken';
import removeKeys from '../helpers/removekeys';
import ErrorHandler from '../helpers/ErrorHandler';

const { User } = models;

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
      googleOauthID,
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
      const e = ErrorHandler.handleErrors(error);
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
      const validPassword = user.validPassword(password);
      const { token } = signToken(req);
      if (!token) {
        return res.status(500).send({
          message: 'Internal Server Error'
        });
      }
      if (!user) {
        return res.status(400).send({
          message: 'Email or password incorrect'
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
      const e = ErrorHandler.handleErrors(error);
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
        ]
      })
      .then(users => res.status(200).send({ users }))
      .catch((error) => {
        const e = ErrorHandler.handleErrors(error);
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
      .findById(userId, {
        attributes: {
          exclude: ['salt', 'hash']
        }
      })
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
            const e = ErrorHandler.handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = ErrorHandler.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default UserController;