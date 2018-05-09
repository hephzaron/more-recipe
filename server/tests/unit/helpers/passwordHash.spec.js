import chai from 'chai';
import { hashPassword, verifyPassword } from '../../../helpers/passwordHash';

const { assert } = chai;

describe('Password Hash', () => {
  const password = 'password';

  it('it should return hash and salt of hashed password', () => {
    const { salt, hash } = hashPassword(password);
    global.hashedPassword = { salt, hash };
    assert.equal(typeof(salt), 'string');
    assert.equal(typeof(hash), 'string');
  });

  it('it should return truthy value for valid password', () => {
    const { salt, hash } = global.hashedPassword;
    const { validPassword } = verifyPassword(password, salt, hash);
    assert.equal(typeof(validPassword), 'boolean');
    assert.equal(validPassword, true);
  });

  it('it should return falsy value for invalid password', () => {
    const { salt, hash } = global.hashedPassword;
    const { validPassword } = verifyPassword(`${password}-invalid`, salt, hash);
    assert.equal(typeof(validPassword), 'boolean');
    assert.equal(validPassword, false);
  });

  it('it should return falsy value for empty or incomplete param', () => {
    const { validPassword } = verifyPassword(password);
    assert.equal(typeof(validPassword), 'boolean');
    assert.equal(validPassword, false);
  });
});