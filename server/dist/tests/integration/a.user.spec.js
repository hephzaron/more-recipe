'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../../src/server');

var _server2 = _interopRequireDefault(_server);

var _user = require('../seeds/user');

var _seeds = require('../seeds');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var request = (0, _supertest2.default)(_server2.default);

describe('User account', function () {
  before(function (done) {
    (0, _seeds.dropOrCreateTable)(done);
  });
  var newUser = void 0;
  /**
   * @function Signup suite
   */
  describe('# Signup', function () {
    it('should create a user', function (done) {
      request.post('/api/v1/signup').send(_user.user).end(function (err, res) {
        global.user = res.body.userPayload; // set user object as global varibale
        if (err) {
          return done(err);
        }
        var _res$body = res.body,
            userPayload = _res$body.userPayload,
            message = _res$body.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Your account has been created successfully');
        expect(userPayload).to.be.an('object');
        expect(userPayload).to.have.keys(['user', 'token']);
        expect(userPayload.user.id).to.be.equal(1);
        expect(userPayload.user.email).to.be.equal(_user.user.email);
        done();
      });
    });
    it('should not create a user using the same email address more than once', function (done) {
      request.post('/api/v1/signup').send(_user.user).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Validation error: This email already belongs to a user');
        done();
      });
    });

    it('should not create a user if the password does not match', function (done) {
      newUser = (0, _extends3.default)({}, _user.user, {
        confirmPassword: 'anotherPassword'
      });
      request.post('/api/v1/signup').send(newUser).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Password does not match');
        done();
      });
    });

    it('should not create a user if one or more field is empty', function (done) {
      request.post('/api/v1/signup').send({}).end(function (err, res) {
        var message = res.body.message;

        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(400);
        expect(message).to.be.an('string');
        expect(message.startsWith('notNull Violation')).to.equal(true);
        done();
      });
    });
  });

  /**
   * @function Signin suite
   */
  describe('# Login', function () {
    it('should not login an unregistered user', function (done) {
      newUser = (0, _extends3.default)({}, _user.user, {
        email: 'unregistered@email.com'
      });
      request.post('/api/v1/login').send(newUser).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('This email does not exist. Please try again or create an account if not registered');
        done();
      });
    });

    it('should not log a user in with a wrong password', function (done) {
      newUser = (0, _extends3.default)({}, _user.user, {
        password: 'wrongPassword'
      });
      request.post('/api/v1/login').send(newUser).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Email or password incorrect');
        done();
      });
    });

    it('should log a user in', function (done) {
      request.post('/api/v1/login').send(_user.user).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Login successful');
        expect(res.body).to.have.keys(['token', 'user', 'message']);
        done();
      });
    });
  });
});

describe('User priviledge', function () {
  /**
   * @function Get Users suite
   */
  describe('# Fetch user', function () {
    before(function (done) {
      (0, _seeds.seedUserTable)(done);
    });
    it('it should get a single user', function (done) {
      request.get('/api/v1/users/1').end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.id).to.be.equal(1);
        done();
      });
    });

    it('it should get all users', function (done) {
      request.get('/api/v1/users').end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.users).to.be.an('array');
        expect(res.body.users.length).to.be.equal(4);
        done();
      });
    });
  });

  /**
   * @function Edit user suite
   */
  describe('# Edit user', function () {
    it('it should edit a user', function (done) {
      var token = global.user.token;

      request.put('/api/v1/users/1').set('authorization', token).send({ username: 'changeUsername' }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Your profile has been updated successfully');
        done();
      });
    });
  });
});

describe('Recover password', function () {
  var email = _user.user.email;
  /**
   * @function Send reset link suite
   */

  describe('# Send reset link', function () {
    it('should not send reset link where email does not exist', function (done) {
      request.post('/api/v1/users/reset_password').send({ email: 'emaildoesnotexist@mail.com' }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User with this email does not exist');
        done();
      });
    });

    it('should send reset link where email does exist', function (done) {
      request.post('/api/v1/users/reset_password').send({ email: email }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('A password reset link has been sent to ' + email + '. It may take upto 5 mins for the mail to arrive.');
        done();
      });
    });
  });

  /**
   * @function Reset password suite
   */
  describe('# Reset or Change password', function () {
    it('should not change password where link is broken', function (done) {
      request.post('/api/v1/auth/reset_password').send({ email: email }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('You are not authorize to perform this action');
        done();
      });
    });

    it('should not change password where password does not match', function (done) {
      (0, _seeds.getResetToken)(email).then(function (userDetails) {
        var resetPasswordToken = userDetails.resetPasswordToken;

        global.resetPasswordToken = resetPasswordToken;
        request.post('/api/v1/auth/reset_password?token=' + global.resetPasswordToken).send({
          email: email,
          password: 'newpassword',
          confirmPassword: 'differentPass'
        }).end(function (err, res) {
          if (err) {
            return done(err);
          }
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Password does not match');
          done();
        });
      });
    });
    it('should change password', function (done) {
      request.post('/api/v1/auth/reset_password?token=' + global.resetPasswordToken).send({
        email: email,
        password: 'newPassword',
        confirmPassword: 'newPassword'
      }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Password successfully changed. Please login to your account.');
        done();
      });
    });
  });
});