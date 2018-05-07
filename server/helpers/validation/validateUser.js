import { isEmpty } from 'lodash';
import removeKeys from '../removekeys';

/**
 * Validate user entries
 * @param { object } user
 * @returns { object } isValid and errors
 */
const validateUser = (user) => {
  const {
    email,
    age,
    sex,
    salt,
    hash,
    facebookOauthID,
    googleOauthID
  } = user;
  const errors = {};
  const isAlphaNumeric = /^\w*$/i;
  const isEmail = /@\w*(.com)$/i;
  if (!salt || !hash || !facebookOauthID || !googleOauthID) {
    Object.keys(user).forEach((key) => {
      if (isEmpty(user[key.toString()])) {
        errors[key.toString()] = `${key} cannot be empty`;
      }
      if (!isAlphaNumeric.test(user[key.toString()]) &&
        (key.toString() !== 'email') && (key.toString() !== 'age')) {
        errors[key.toString()] = `${key} must be alphanumeric`;
      }
    });
    if (!isEmail.test(email)) {
      errors.email = 'This is not an email';
    }
    if (Number.isNaN(age)) {
      errors.age = 'Age is not a number';
    }
    if (!(/^(male||female)$/i).test(sex)) {
      errors.sex = 'Sex must be a male or female';
    }
  }
  const object = removeKeys(errors, [
    'salt', 'hash', 'facebookOauthID', 'googleOauthID'
  ]);
  return {
    isValid: isEmpty(errors),
    errors: object
  };
};

export default validateUser;