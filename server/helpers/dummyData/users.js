export default () => {
  const user = {
    id: 1,
    lastName: 'LastName',
    firstName: 'FirstName',
    email: 'email@email.com',
    username: 'Username',
    password: 'password',
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
      password: 'password',
      age: 24,
      sex: 'Male'
    },
    2: {
      id: 2,
      lastName: 'LastName2',
      firstName: 'FirstName2',
      email: 'email2@email.com',
      username: 'Username2',
      password: 'password2',
      age: 25,
      sex: 'Female'
    },
    3: {
      id: 3,
      lastName: 'LastName3',
      firstName: 'FirstName3',
      email: 'email3@email.com',
      username: 'Username3',
      password: 'password3',
      age: 26,
      sex: 'Male'
    }
  };
  return {
    user,
    users
  };
};