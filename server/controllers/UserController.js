import { User as UserClass } from '../helpers/in-memory';
import { hashPassword, verifyPassword } from '../helpers/passwordHash';
import signToken from '../helpers/signToken';


/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */
class UserController extends UserClass {
  /**
   * Registers a new user
   * @method signup
   * @memberof UserController
   * @param {object} req -request object
   * @param {object} res -response object
   * @returns { promise } response
   */
  signup(req, res) {
    const { password, confirmPassword } = req.body;
    const { salt, hash } = hashPassword(password);
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const email = req.body.email || '';
    const username = req.body.username || '';
    const age = req.body.age || 0;
    const sex = req.body.sex || 'Male';
    const facebookOauthID = req.body.facebookOauthID || '';
    const googleOauthID = req.body.googleOauthID || '';

    if (password === confirmPassword) {
      return res.status(400).send({
        message: 'Password does not match'
      });
    }

    return this.create({
      firstName,
      lastName,
      salt,
      hash,
      email,
      username,
      age,
      sex,
      facebookOauthID,
      googleOauthID
    }).then((user) => {
      const { token } = signToken(req);
      return res.status(201).send({
        userPayload: {
          userId: user.id,
          token
        },
        message: 'Your account has been created successfully'
      });
    }).catch(() => res.status(500).send({
      message: 'Internal Server Error'
    }));
  }

  /**
   * Login a user
   * @method login
   * @memberof UserController
   * @param {object} req -request object
   * @param {object} res -response object
   * @returns { null } void
   */
  login(req, res) {
    const {
      email,
      password
    } = req.body;
    this.findOne({ where: email }).then((user) => {
      const { validPassword } = verifyPassword(password, user.salt, user.hash);
      const { token } = signToken(req);
      if (!user) {
        return res.status(404).send({
          message: 'Email or password incorrect'
        });
      }
      if (!validPassword) {
        return res.status(404).send({
          message: 'Email or password incorrect'
        });
      }
      return res.status(200).send({
        token,
        user,
        message: 'Login successful'
      });
    }).catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }

  /**
   * Get all user
   * @param { object } req -request
   * @param { object } res -response
   * @return { promise } response
   */
  getAllUsers(req, res) {
    this.list()
      .then(users => res.status(200).send({ users }))
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }

  /**
   * Edit a user
   * @param {object} req -request
   * @param { object } res -response
   * @returns { object } response
   */
  editUser(req, res) {
    const { userId } = req.param;
    this.update({ user: req.body, userId })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Oops! User details could not be updated'
          });
        }
        return res.status(200).send({ user });
      })
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
}

export default UserController;