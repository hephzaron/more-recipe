import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotEnv from 'dotenv';

dotEnv.config();

const secret = process.env.JWT_SECRET;
const timeZone = process.env.TIME_ZONE;

/**
 * Generate unique identifier
 * @param { null } void
 * @returns { object } date object
 */
function generateGUID() {
  const now = new Date().getTime();
  return now;
}

/**
 * Sign user payload
 * @param { object } req -request object
 * @returns { object } token- signed token
 */
export default (req) => {
  const GUID = generateGUID();
  const expiresDefault = Math.floor(new Date().getTime() / 1000) + (24 * 60 * 60);
  const payload = {
    auth: GUID,
    agent: req.headers['user-agent'],
    exp: expiresDefault,
    username: req.body.username
  };

  const token = jwt.sign(payload, secret, { algorithm: 'HS256' });
  return {
    token
  };
};