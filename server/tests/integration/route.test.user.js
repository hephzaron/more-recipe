import chai from 'chai';
import supertest from 'supertest';
import app from '../../src';
import { user } from '../../helpers/dummyData';

const { expect } = chai;
const request = supertest(app);

describe('/POST User', () => {
  let authorization;

  it('it should post user details', (done) => {
    request
      .post('/api/v1/signup')
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { userPayload, message } = res.body;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Your account has been created successfully');
        expect(userPayload).to.be.an('object');
        expect(userPayload).to.have.keys(['user', 'token']);
        expect(userPayload.user.id).to.be.equal(2);
        expect(userPayload.user.email).to.be.equal(user.email);
        done();
      });
  });
  it('it should login a registered user', (done) => {
    const { email, password } = user;
    request
      .post('/api/v1/login')
      .send({ email, password })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { token, message } = res.body;
        authorization = token;
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Login successful');
        expect(token).to.be.a('string');
        expect(res.body).to.have.keys(['token', 'user', 'message']);
        done();
      });
  });
  it('it should get all users', (done) => {
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
        expect(users.length).to.be.equal(2);
        expect(users[0].id).to.be.equal(1);
        expect(users[1].email).to.be.equal(user.email);
        done();
      });
  });
  it('it should edit a user', (done) => {
    request
      .put('/api/v1/users/1')
      .set('authorization', authorization)
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
  });
});