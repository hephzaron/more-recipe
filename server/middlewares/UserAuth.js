import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';
import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';

const { User } = models;
const { handleErrors } = ErrorHandler;
dotEnv.config();
/**
 * @class UserAuth
 * @description Secure routes
 * @returns { promise } - response
 */
class UserAuth {
  /**
   * @memberof UserAuth
   * @method verifyUser
   * @param { object } req
   * @param { object } res
   * @param { function } next
   * @returns { promise } response
   */
  static verifyUser(req, res, next) {
    const { userId } = req.params;
    const {
      upVotes,
      downVotes,
      likes,
      dislikes
    } = req.body;
    try {
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, process.env.JWT_SECRET, { algorithm: 'HS256' });
      /** Insert code to find user payload from user list */
      if (!decoded) {
        return res.status(401).send({
          message: 'You are not authorized to perform this action'
        });
      }
      const { email } = decoded;
      User
        .findOne({
          where: { email }
        })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'Token invalid or expired-user not found'
            });
          }
          if (userId &&
            (!(upVotes || downVotes || likes || dislikes) ||
              ((upVotes || downVotes || likes || dislikes) && req.method !== 'PUT')) &&
            (parseInt(userId, 10) !== user.id)) {
            return res.status(401).send({
              message: 'You are not authorized to access this account'
            });
          }
          next();
        })
        .catch((error) => {
          const e = handleErrors(error);
          return res.status(e.statusCode).send({
            message: e.message
          });
        });
    } catch (e) {
      return res.status(401).send({
        message: 'Token invalid or expired-user not found'
      });
    }
  }
}
export default UserAuth;