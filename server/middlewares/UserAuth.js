import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

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
    try {
      const token = req.headers.authorization;
      const decoded = jwt.decode(token, process.env.JWT_SECRET, { algorithm: 'HS256' });
      /** Insert code to find user payload from user list */
      if (!decoded) {
        return res.status(401).send({
          message: 'Token invalid or expired-user not found'
        });
      }
      next();
    } catch (e) {
      return res.status(401).send({
        message: 'Token invalid or expired-user not found'
      });
    }
  }
}
export default UserAuth;