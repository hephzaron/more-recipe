import Crypto from 'crypto';

/**
 * Hash password to be stored in database
 * @param { string } password - User password
 * @returns { object } salt and hash
 */
export const hashPassword = (password) => {
  const salt = Crypto.randomBytes(16).toString('hex');
  const hash = Crypto.pbkdf2Sync(password, salt, 1000, 64, 'SHA1').toString('hex');
  return {
    salt,
    hash
  };
};

/**
 * Verifies password
 * @param { string } password - User password
 * @param { string } userSalt - User random string saved on database
 * @param { string } userHash  - User hashed password saved on database
 * @returns { boolean } validPassword
 */

export const verifyPassword = (password, userSalt, userHash) => {
  let validPassword = false;
  if (password && userSalt && userHash) {
    const hash = Crypto.pbkdf2Sync(password, userSalt, 1000, 64, 'SHA1').toString('hex');
    if (hash === userHash) {
      validPassword = true;
    }
  }
  return {
    validPassword
  };
};