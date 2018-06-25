'use strict';

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

/**
 * @function SavedRecipe actions suite
 */
describe('SavedRecipe', function () {
  var _generateToken = (0, _seeds.generateToken)(_user.user.email),
      token = _generateToken.token;

  var userId = 1;
  var recipeId = 2;

  it('it should save recipe', function (done) {
    request.post('/api/v1/recipes/save/' + userId + '/' + recipeId).set('authorization', token).end(function (err, res) {
      if (err) {
        return done(err);
      }
      var message = res.body.message;

      expect(res.statusCode).to.be.equal(201);
      expect(res.body).to.be.an('object');
      expect(message).to.be.equal('Recipe saved');
      done();
    });
  });

  it('it should fetch user saved recipe', function (done) {
    request.get('/api/v1/recipes/saved/' + userId).set('authorization', token).end(function (err, res) {
      if (err) {
        return done(err);
      }
      var savedRecipe = res.body.savedRecipe;

      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(savedRecipe).to.be.an('array');
      done();
    });
  });

  it('it should unsave recipe', function (done) {
    request.delete('/api/v1/recipes/unsave/' + userId + '/' + recipeId).set('authorization', token).end(function (err, res) {
      if (err) {
        return done(err);
      }
      var message = res.body.message;

      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(message).to.be.equal('Recipe removed');
      done();
    });
  });

  it('it should do nothing if recipe have not been saved or removed', function (done) {
    request.delete('/api/v1/recipes/unsave/' + userId + '/' + recipeId).set('authorization', token).end(function (err, res) {
      if (err) {
        return done(err);
      }
      var message = res.body.message;

      expect(res.statusCode).to.be.equal(401);
      expect(res.body).to.be.an('object');
      expect(message).to.be.equal('Recipe have never been saved');
      done();
    });
  });

  it('it should not fetch recipe where non is saved', function (done) {
    request.get('/api/v1/recipes/saved/' + userId).set('authorization', token).end(function (err, res) {
      if (err) {
        return done(err);
      }
      var _res$body = res.body,
          savedRecipe = _res$body.savedRecipe,
          message = _res$body.message;

      expect(res.statusCode).to.be.equal(401);
      expect(res.body).to.be.an('object');
      expect(savedRecipe).to.be.equal(undefined);
      expect(message).to.be.equal('You have no saved recipe yet');
      done();
    });
  });
});