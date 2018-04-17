import { User } from '../models';
import { userData } from '../helpers/dummyData';
import { hashPassword, verifyPassword } from '../helpers/passwordHash';
import signToken from '../helpers/signToken';


/**
 * Handles User(s) related function
 * @class UserController
 * @param { null } void
 * @returns {null} void
 */
class UserController {
  /**
   * Registers a new user
   * @method createUser
   * @memberof UserController
   * @param {object} req -request object
   * @param {object} res -response object
   * @returns { null } void
   */
  static signup(req, res) {
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

    return User.create({
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
}

export default UserController;