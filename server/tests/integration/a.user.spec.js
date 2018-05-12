import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/server';
import { user } from '../../helpers/dummyData';

const { expect } = chai;
const request = supertest(app);

describe('User account', () => {
  let newUser;
  /**
   * @function Signup suite
   */
  describe('# Signup', () => {
    it(
      'should create a user',
      (done) => {
        request
          .post('/api/v1/signup')
          .send(user)
          .end((err, res) => {
            global.user = res.body.userPayload; // set user object as global varibale
            if (err) {
              return done(err);
            }
            const { userPayload, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Your account has been created successfully');
            expect(userPayload).to.be.an('object');
            expect(userPayload).to.have.keys(['user', 'token']);
            expect(userPayload.user.id).to.be.equal(1);
            expect(userPayload.user.email).to.be.equal(user.email);
            done();
          });
      }
    );
    it(
      'should not create a user using the same email address more than once',
      (done) => {
        request
          .post('/api/v1/signup')
          .send(user)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('User already exists');
            done();
          });
      }
    );

    it(
      'should not create a user if the password does not match',
      (done) => {
        newUser = {
          ...user,
          confirmPassword: 'anotherPassword'
        };

        request
          .post('/api/v1/signup')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Password does not match');
            done();
          });
      }
    );

    it(
      'should not create a user if one or more field is empty',
      (done) => {
        request
          .post('/api/v1/signup')
          .send({})
          .end((err, res) => {
            const { errors } = res.body;
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(400);
            expect(errors).to.be.an('object');
            expect(errors).to.have.keys([
              'firstName', 'lastName', 'password', 'email', 'username', 'age'
            ]);
            Object.keys(errors).forEach((key, index) => {
              if (key === 'email') {
                expect(errors.email).to.be.equal('This is not an email');
              } else {
                expect(errors[key.toString()]).to.be.equal(`${key} cannot be empty`);
              }
              if (index >= Object.keys(errors).length) {
                return done();
              }
            });
            done();
          });
      }
    );
  });

  /**
   * @function Signin suite
   */
  describe('# Login', () => {
    it(
      'should not login an unregistered user',
      (done) => {
        newUser = {
          ...user,
          email: 'unregistered@email.com'
        };
        request
          .post('/api/v1/login')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('User does not exist');
            done();
          });
      }
    );

    it(
      'should not log a user in with a wrong password',
      (done) => {
        newUser = {
          ...user,
          password: 'wrongPassword'
        };
        request
          .post('/api/v1/login')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Email or password incorrect');
            done();
          });
      }
    );

    it(
      'should log a user in',
      (done) => {
        request
          .post('/api/v1/login')
          .send(user)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.equal('Login successful');
            expect(res.body).to.have.keys(['token', 'user', 'message']);
            done();
          });
      }
    );
  });
});

describe('User priviledge', () => {
  /**
   * @function Get Users suite
   */
  describe('# Fetch user', () => {
    it(
      'it should get all users',
      (done) => {
        request
          .get('/api/v1/users')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { users } = res.body;
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.an('object');
            expect(users).to.be.an('array');
            expect(users.length).to.be.equal(1);
            expect(users[0].id).to.be.equal(1);
            done();
          });
      }
    );
  });

  /**
   * @function Edit user suite
   */
  describe('# Edit user', () => {
    it(
      'it should edit a user',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/users/1')
          .set('authorization', token)
          .send({ username: 'changeUsername' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.user.username).to.be.equal('changeUsername');
            expect(res.body.user.username).to.not.equal(user.username);
            done();
          });
      }
    );
  });
});