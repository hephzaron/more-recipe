import _ from 'lodash';
import generateIndex from '../generateIndex';
import { hashPassword } from '../passwordHash';
import { validateUser } from '../validation';
import removeKeys from '../removekeys';

/**
 * User in-memory data
 */
class User {
  /**
   * Creates class instance
   * @param { null } void
   * @returns { object } Instance of Users class
   */
  constructor() {
    this.index = 0;
    this.users = [];
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      salt: '',
      hash: '',
      email: '',
      username: '',
      age: '',
      sex: 'Male',
      facebookOauthID: '',
      googleOauthID: ''
    };
  }

  /**
   * Adds recipe to array
   * @param { object } newUser
   * @returns { promise } createdUser
   */
  create(newUser) {
    const { isValid, errors } = validateUser(newUser);
    if (!isValid) {
      return Promise.reject(errors);
    }
    const userExists = this.users.findIndex(user => user.email === newUser.email);
    if (userExists >= 0) {
      return Promise.reject(new Error('User already exists'));
    }
    const lastIndex = this.index;
    const { nextIndex } = generateIndex({ lastIndex });
    this.index = nextIndex;
    const { salt, hash } = hashPassword(newUser.password);
    const withoutPassword = removeKeys(newUser, ['password']);
    const indexedUser = {
      id: nextIndex,
      salt,
      hash,
      ...withoutPassword
    };
    this.user = Object.assign({}, {...this.user }, indexedUser);
    this.users.push(this.user);
    if (this.users[this.users.length - 1] !== this.user) {
      return Promise.reject(new Error('An error occured in creating a new user'));
    }
    const withoutHash = removeKeys({...this.user }, ['salt', 'hash', 'facebookOauthID', 'googleOauthID']);
    return Promise.resolve(withoutHash);
  }

  /**
   * Finds a user
   * @param { number } userId
   * @returns { promise } user
   */
  findOne({ where }) {
    const userIndex = _.findIndex(this.users, {...where });
    if (userIndex === -1) {
      return Promise.reject(new Error('User does not exist'));
    }
    return Promise.resolve(this.users[userIndex]);
  }

  /**
   * Update a user details
   * @param { number } userId
   * @param { object } user
   * @returns { void } null
   */
  update({ user, userId }) {
    const {
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
    } = user;
    return this.findOne({ where: { id: parseInt(userId, 10) } })
      .then((userFound) => {
        this.users.splice(
          userFound.id - 1, 1,
          Object.assign({}, {...userFound }, {
            firstName: firstName || userFound.firstName,
            lastName: lastName || userFound.lastName,
            salt: salt || userFound.salt,
            hash: hash || userFound.hash,
            email: email || userFound.email,
            username: username || userFound.username,
            age: age || userFound.age,
            sex: sex || userFound.sex,
            facebookOauthID: facebookOauthID || userFound.facebookOauthID,
            googleOauthID: googleOauthID || userFound.googleOauthID
          })
        );
        const withoutHash = removeKeys(this.users[userFound.id - 1], ['salt', 'hash']);
        return Promise.resolve(withoutHash);
      }).catch(error => Promise.reject(error));
  }

  /**
   * Get all user
   * @param { void } null
   * @returns { promise } users
   */
  list() {
    const users = [...this.users];
    if (!this.users) {
      return Promise.reject(new Error('Users list not available'));
    }
    if (this.users.length === 0) {
      return Promise.resolve({ users, message: 'No user created yet' });
    }
    users.map(user => removeKeys(user, ['salt', 'hash']));
    return Promise.resolve(users);
  }
}

export default User;