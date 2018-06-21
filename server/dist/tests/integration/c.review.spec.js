'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../../src/server');

var _server2 = _interopRequireDefault(_server);

var _review = require('../seeds/review');

var _seeds = require('../seeds');

var _user = require('../seeds/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var request = (0, _supertest2.default)(_server2.default);

describe('Review', function () {
  var _generateToken = (0, _seeds.generateToken)(_user.user.email),
      token = _generateToken.token;

  /**
   * @function Review success suite
   */


  describe('# Review success', function () {
    it('it should add review to recipe', function (done) {
      var recipeId = 2;
      request.post('/api/v1/recipes/' + recipeId + '/reviews').set('authorization', token).send(_review.reviewDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body = res.body,
            review = _res$body.review,
            message = _res$body.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('You have just reviewed item');
        expect(review).to.be.an('object');
        expect(review.recipeId).to.be.equal(2);
        expect(review.parentId).to.be.equal(2);
        expect(review.description).to.be.equal(_review.reviewDetails.description);
        done();
      });
    });

    it('it should edit review', function (done) {
      var userId = 1;
      var reviewId = 4;
      request.put('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', token).send({
        description: 'edit description'
      }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body2 = res.body,
            updatedReview = _res$body2.updatedReview,
            message = _res$body2.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('Your review have been updated successfully');
        expect(updatedReview).to.be.an('object');
        expect(updatedReview.recipeId).to.be.equal(2);
        expect(updatedReview.parentId).to.be.equal(2);
        done();
      });
    });
  });

  /**
   * @function Review errors suite
   */
  describe('# Review client errors', function () {
    it('it should not add review if recipe does not exist', function (done) {
      var recipeId = 20;
      request.post('/api/v1/recipes/' + recipeId + '/reviews').set('authorization', token).send(_review.reviewDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('Recipe does not exist');
        done();
      });
    });

    it('it should not add review if selected item is invalid does not exist', function (done) {
      var recipeId = 2;
      var parentId = 20;
      request.post('/api/v1/recipes/' + recipeId + '/reviews').set('authorization', token).send((0, _extends3.default)({}, _review.reviewDetails, {
        parentId: parentId
      })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('You are trying review an invalid item. Please select an item');
        done();
      });
    });

    it('it should not edit review if user does not own review', function (done) {
      var userId = 2;
      var reviewId = 4;
      request.put('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', (0, _seeds.generateToken)(_user.users[0].email).token).send({
        description: 'edit description'
      }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('You are not allowed to modify this review. Please add your own review instead');
        done();
      });
    });

    it('it should return error for non-existing review', function (done) {
      var userId = 2;
      var reviewId = 10;
      request.put('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', (0, _seeds.generateToken)(_user.users[0].email).token).send({
        description: 'edit description'
      }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('Review does not exist');
        done();
      });
    });

    it('it should return error for non-existing review on delete route', function (done) {
      var userId = 1;
      var reviewId = 10;
      request.delete('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', token).send({
        description: 'edit description'
      }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('Review does not exist');
        done();
      });
    });

    it('it should not delete review if user does not own review', function (done) {
      var userId = 2;
      var reviewId = 4;
      request.delete('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', (0, _seeds.generateToken)(_user.users[0].email).token).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('You are not allowed to delete this review.');
        done();
      });
    });

    it('it should delete review', function (done) {
      var userId = 1;
      var reviewId = 4;
      request.delete('/api/v1/recipes/' + userId + '/reviews/' + reviewId).set('authorization', token).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('Review deleted successfully');
        done();
      });
    });
  });
});