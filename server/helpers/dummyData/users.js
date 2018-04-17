export default () => {
  const userData = {
    id: 1,
    lastName: 'LastName',
    firstName: 'FirstName',
    email: 'email@email.com',
    username: 'Username',
    password: 'password',
    confirmPassword: 'password',
    googleOauthID: 'googleOauthID-1',
    facebookOauthID: 'facebookOauthID-1',
    age: 24,
    sex: 'Male'
  };
  const users = {
    1: {
      id: 1,
      lastName: 'LastName',
      firstName: 'FirstName',
      email: 'email@email.com',
      username: 'Username',
      salt: 'passwordSalt-1',
      hash: 'passwordHash-1',
      resetPasswordToken: 'resetPasswordToken-1',
      resetPasswordExpires: 'resetPasswordExpires-1',
      googleOauthID: 'googleOauthID-1',
      facebookOauthID: 'facebookOauthID-1',
      age: 24,
      sex: 'Male'
    },
    2: {
      id: 2,
      lastName: 'LastName2',
      firstName: 'FirstName2',
      email: 'email2@email.com',
      username: 'Username2',
      salt: 'passwordSalt-1',
      hash: 'passwordHash-1',
      resetPasswordToken: 'resetPasswordToken-1',
      resetPasswordExpires: 'resetPasswordExpires-1',
      googleOauthID: 'googleOauthID-1',
      facebookOauthID: 'facebookOauthID-1',
      age: 25,
      sex: 'Female'
    },
    3: {
      id: 3,
      lastName: 'LastName3',
      firstName: 'FirstName3',
      email: 'email3@email.com',
      username: 'Username3',
      salt: 'passwordSalt-1',
      hash: 'passwordHash-1',
      resetPasswordToken: 'resetPasswordToken-1',
      resetPasswordExpires: 'resetPasswordExpires-1',
      googleOauthID: 'googleOauthID-1',
      facebookOauthID: 'facebookOauthID-1',
      age: 26,
      sex: 'Male'
    }
  };
  return {
    userData,
    users
  };
};