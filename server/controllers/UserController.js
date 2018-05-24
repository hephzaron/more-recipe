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
  static getAllUsers(req, res) {
    return User.list()
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
    return User.update({ user: req.body, userId })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Oops! User details could not be updated'
          });
        }
        return res.status(200).send({ user });
      }).catch((error) => {
        const e = ErrorHandler.handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default UserController;