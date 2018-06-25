import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/server';
import { user } from '../seeds/user';
import { generateToken } from '../seeds';

const { expect } = chai;
const request = supertest(app);

/**
 * @function SavedRecipe actions suite
 */
describe('SavedRecipe', () => {
  const { token } = generateToken(user.email);
  const userId = 1;
  const recipeId = 2;

  it(
    'it should save recipe',
    (done) => {
      request
        .post(`/api/v1/recipes/save/${userId}/${recipeId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const { body: { message } } = res;
          expect(res.statusCode).to.be.equal(201);
          expect(res.body).to.be.an('object');
          expect(message).to.be.equal('Recipe saved');
          done();
        });
    }
  );

  it(
    'it should fetch user saved recipe',
    (done) => {
      request
        .get(`/api/v1/recipes/saved/${userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const { body: { savedRecipe } } = res;
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(savedRecipe).to.be.an('array');
          done();
        });
    }
  );

  it(
    'it should unsave recipe',
    (done) => {
      request
        .delete(`/api/v1/recipes/unsave/${userId}/${recipeId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const { body: { message } } = res;
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.be.an('object');
          expect(message).to.be.equal('Recipe removed');
          done();
        });
    }
  );

  it(
    'it should do nothing if recipe have not been saved or removed',
    (done) => {
      request
        .delete(`/api/v1/recipes/unsave/${userId}/${recipeId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const { body: { message } } = res;
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(message).to.be.equal('Recipe have never been saved');
          done();
        });
    }
  );

  it(
    'it should not fetch recipe where non is saved',
    (done) => {
      request
        .get(`/api/v1/recipes/saved/${userId}`)
        .set('authorization', token)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          const { body: { savedRecipe, message } } = res;
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.be.an('object');
          expect(savedRecipe).to.be.equal(undefined);
          expect(message).to.be.equal('You have no saved recipe yet');
          done();
        });
    }
  );
});