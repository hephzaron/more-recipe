import { isEmpty } from 'lodash';

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
      if (isEmpty(user[key])) {
        errors.key = `${key} cannot be empty`;
      }
      if (!isAlphaNumeric.test(user[key])) {
        errors.key = `${key} must be alphanumeric`;
      }
    });
    if (!isEmail.test(email)) {
      errors.email = 'This is not an email';
    }
    if (Number.isNaN(age)) {
      errors.age = 'Age is not a number';
    }
    if (sex.toLowerCase() !== ('male' || 'female')) {
      errors.sex = 'Sex must be a male or female';
    }
  }
  return {
    isValid: isEmpty(errors),
    errors
  };
};

export default validateUser;