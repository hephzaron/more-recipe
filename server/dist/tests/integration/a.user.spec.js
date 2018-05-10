'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _src = require('../../src');

var _src2 = _interopRequireDefault(_src);

var _dummyData = require('../../helpers/dummyData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var request = (0, _supertest2.default)(_src2.default);

describe('User account', function () {
  var newUser = void 0;
  /**
   * @function Signup suite
   */
  describe('# Signup', function () {
    it('should create a user', function (done) {
      request.post('/api/v1/signup').send(_dummyData.user).end(function (err, res) {
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
        expect(userPayload.user.email).to.be.equal(_dummyData.user.email);
        done();
      });
    });
    it('should not create a user using the same email address more than once', function (done) {
      request.post('/api/v1/signup').send(_dummyData.user).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User already exists');
        done();
      });
    });

    it('should not create a user if the password does not match', function (done) {
      newUser = _extends({}, _dummyData.user, {
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
        var errors = res.body.errors;

        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(400);
        expect(errors).to.be.an('object');
        expect(errors).to.have.keys(['firstName', 'lastName', 'password', 'email', 'username', 'age']);
        Object.keys(errors).forEach(function (key, index) {
          if (key === 'email') {
            expect(errors.email).to.be.equal('This is not an email');
          } else {
            expect(errors[key.toString()]).to.be.equal(key + ' cannot be empty');
          }
          if (index >= Object.keys(errors).length) {
            return done();
          }
        });
        done();
      });
    });
  });

  /**
   * @function Signin suite
   */
  describe('# Login', function () {
    it('should not login an unregistered user', function (done) {
      newUser = _extends({}, _dummyData.user, {
        email: 'unregistered@email.com'
      });
      request.post('/api/v1/login').send(newUser).end(function (err, res) {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
    });

    it('should not log a user in with a wrong password', function (done) {
      newUser = _extends({}, _dummyData.user, {
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
      request.post('/api/v1/login').send(_dummyData.user).end(function (err, res) {
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
    it('it should get all users', function (done) {
      request.get('/api/v1/users').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var users = res.body.users;

        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(users).to.be.an('array');
        expect(users.length).to.be.equal(1);
        expect(users[0].id).to.be.equal(1);
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
        expect(res.body.user.username).to.be.equal('changeUsername');
        expect(res.body.user.username).to.not.equal(_dummyData.user.username);
        done();
      });
    });
  });
});