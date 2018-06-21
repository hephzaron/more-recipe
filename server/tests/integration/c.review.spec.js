import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/server';
import { reviewDetails } from '../seeds/review';
import { generateToken } from '../seeds';
import { user, users } from '../seeds/user';

const { expect } = chai;
const request = supertest(app);

describe('Review', () => {
  const { token } = generateToken(user.email);

  /**
   * @function Review success suite
   */
  describe('# Review success', () => {
    it(
      'it should add review to recipe',
      (done) => {
        const recipeId = 2;
        request
          .post(`/api/v1/recipes/${recipeId}/reviews`)
          .set('authorization', token)
          .send(reviewDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { review, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.be.equal('You have just reviewed item');
            expect(review).to.be.an('object');
            expect(review.recipeId).to.be.equal(2);
            expect(review.parentId).to.be.equal(2);
            expect(review.description).to.be.equal(reviewDetails.description);
            done();
          });
      }
    );

    it(
      'it should edit review',
      (done) => {
        const userId = 1;
        const reviewId = 4;
        request
          .put(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', token)
          .send({
            description: 'edit description'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { updatedReview, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.be.equal('Your review have been updated successfully');
            expect(updatedReview).to.be.an('object');
            expect(updatedReview.recipeId).to.be.equal(2);
            expect(updatedReview.parentId).to.be.equal(2);
            done();
          });
      }
    );
  });

  /**
   * @function Review errors suite
   */
  describe('# Review client errors', () => {
    it(
      'it should not add review if recipe does not exist',
      (done) => {
        const recipeId = 20;
        request
          .post(`/api/v1/recipes/${recipeId}/reviews`)
          .set('authorization', token)
          .send(reviewDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('Recipe does not exist');
            done();
          });
      }
    );

    it(
      'it should not add review if selected item is invalid does not exist',
      (done) => {
        const recipeId = 2;
        const parentId = 20;
        request
          .post(`/api/v1/recipes/${recipeId}/reviews`)
          .set('authorization', token)
          .send({
            ...reviewDetails,
            parentId
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('You are trying review an invalid item. Please select an item');
            done();
          });
      }
    );

    it(
      'it should not edit review if user does not own review',
      (done) => {
        const userId = 2;
        const reviewId = 4;
        request
          .put(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', generateToken(users[0].email).token)
          .send({
            description: 'edit description'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('You are not allowed to modify this review. Please add your own review instead');
            done();
          });
      }
    );

    it(
      'it should return error for non-existing review',
      (done) => {
        const userId = 2;
        const reviewId = 10;
        request
          .put(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', generateToken(users[0].email).token)
          .send({
            description: 'edit description'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('Review does not exist');
            done();
          });
      }
    );

    it(
      'it should return error for non-existing review on delete route',
      (done) => {
        const userId = 1;
        const reviewId = 10;
        request
          .delete(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', token)
          .send({
            description: 'edit description'
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('Review does not exist');
            done();
          });
      }
    );

    it(
      'it should not delete review if user does not own review',
      (done) => {
        const userId = 2;
        const reviewId = 4;
        request
          .delete(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', generateToken(users[0].email).token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(message).to.be
              .equal('You are not allowed to delete this review.');
            done();
          });
      }
    );

    it(
      'it should delete review',
      (done) => {
        const userId = 1;
        const reviewId = 4;
        request
          .delete(`/api/v1/recipes/${userId}/reviews/${reviewId}`)
          .set('authorization', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.be.equal('Review deleted successfully');
            done();
          });
      }
    );
  });
});