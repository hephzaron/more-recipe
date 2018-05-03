import { User as UserClass } from '../helpers/in-memory';
import { verifyPassword } from '../helpers/passwordHash';
import signToken from '../helpers/signToken';
import removeKeys from '../helpers/removekeys';

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
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const email = req.body.email || '';
    const username = req.body.username || '';
    const age = req.body.age || 0;
    const sex = req.body.sex || 'Male';
    const facebookOauthID = req.body.facebookOauthID || '';
    const googleOauthID = req.body.googleOauthID || '';

    if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'Password does not match'
      });
    }

    return super.create({
      firstName,
      lastName,
      password,
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
          user,
          token
        },
        message: 'Your account has been created successfully'
      });
    }).catch((error) => {
      if (Object.keys(error).length >= 1) {
        return res.status(400).send({
          errors: {...error }
        });
      }
      return res.status(400).send({
        message: error.message
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
  login(req, res) {
    const {
      email,
      password
    } = req.body;
    super.findOne({
      where: { email }
    }).then((user) => {
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
      const userObject = removeKeys(user, ['salt', 'hash']);
      return res.status(200).send({
        token,
        user: userObject,
        message: 'Login successful'
      });
    }).catch(() => res.status(404).send({
      message: 'Email or password incorrect'
    }));
  }

  /**
   * Get all user
   * @param { object } req -request
   * @param { object } res -response
   * @return { promise } response
   */
  getAllUsers(req, res) {
    super.list()
      .then(users => res.status(200).send({ users }))
      .catch(error => res.status(400).send({
        message: error.message
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
    super.update({ user: req.body, userId })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Oops! User details could not be updated'
          });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  }
}

export default UserController;