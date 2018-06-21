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

var _recipe = require('../seeds/recipe');

var _seeds = require('../seeds');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var request = (0, _supertest2.default)(_server2.default);

describe('Recipe', function () {
  before(function (done) {
    (0, _seeds.seedUserTable)(done);
  });

  var _generateToken = (0, _seeds.generateToken)(_user.user.email),
      token = _generateToken.token;
  /**
   * @function Recipe actions suite
   */

  describe('# Recipe actions', function () {
    it('it should post recipe', function (done) {
      request.post('/api/v1/recipes').set('authorization', token).send(_recipe.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body = res.body,
            recipe = _res$body.recipe,
            message = _res$body.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal(_recipe.recipeDetails.name + ' added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(1);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should post a second recipe', function (done) {
      request.post('/api/v1/recipes').set('authorization', token).send((0, _extends3.default)({}, _recipe.recipeDetails, { name: 'SecondRecipe', userId: 2 })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body2 = res.body,
            recipe = _res$body2.recipe,
            message = _res$body2.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('SecondRecipe added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.userId).to.be.equal(2);
        done();
      });
    });

    it('it should post a third recipe', function (done) {
      request.post('/api/v1/recipes').set('authorization', token).send((0, _extends3.default)({}, _recipe.recipeDetails, { name: 'ThirdRecipe', userId: 3 })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body3 = res.body,
            recipe = _res$body3.recipe,
            message = _res$body3.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('ThirdRecipe added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(3);
        expect(recipe.userId).to.be.equal(3);
        done();
      });
    });

    it('it should get all recipes', function (done) {
      request.get('/api/v1/recipes').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var recipes = res.body.recipes;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(recipes).to.be.an('array');
        expect(recipes.length).to.be.equal(3);
        expect(recipes[0].id).to.be.equal(1);
        expect(recipes[1].id).to.be.equal(2);
        expect(recipes[2].id).to.be.equal(3);
        expect(recipes[0].name).to.be.equal(_recipe.recipeDetails.name);
        expect(recipes[1].name).to.be.equal('SecondRecipe');
        expect(recipes[2].name).to.be.equal('ThirdRecipe');
        done();
      });
    });

    it('it should modify a recipe', function (done) {
      request.put('/api/v1/recipes/1/1').set('authorization', token).send({ name: 'RecipeNameChanged' }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body4 = res.body,
            updatedRecipe = _res$body4.updatedRecipe,
            message = _res$body4.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('RecipeNameChanged has been updated successfully');
        expect(updatedRecipe).to.be.an('object');
        expect(updatedRecipe.id).to.be.equal(1);
        expect(updatedRecipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should delete recipe', function (done) {
      request.delete('/api/v1/recipes/1/1').set('authorization', token).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.have.key('recipe');
        expect(res.body).to.have.keys(['message']);
        expect(message).to.equal('Recipe deleted successfully');
        done();
      });
    });

    it('it should get all recipes after delete', function (done) {
      request.get('/api/v1/recipes').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var recipes = res.body.recipes;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(recipes).to.be.an('array');
        expect(recipes.length).to.be.equal(2);
        expect(recipes[0].id).to.be.equal(2);
        expect(recipes[1].id).to.be.equal(3);
        expect(recipes[0].name).to.be.equal('SecondRecipe');
        expect(recipes[1].name).to.be.equal('ThirdRecipe');
        done();
      });
    });
  });

  /**
   * @function Recipe votes suite
   */
  describe('Recipe Votes', function () {
    it('it should not allow recipe\'s author to vote own recipe', function (done) {
      request.put('/api/v1/recipes/2/2').set('authorization', (0, _seeds.generateToken)(_user.users[0].email).token).send({ upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('You are not allowed to vote your own recipe');
        done();
      });
    });

    it('it should upvote recipe 2', function (done) {
      request.put('/api/v1/recipes/1/2').set('authorization', token).send({ upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body5 = res.body,
            userVote = _res$body5.userVote,
            message = _res$body5.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Voting successful');
        expect(userVote).to.be.an('object');
        expect(userVote.upVotes).to.be.equal(1);
        expect(userVote.userId).to.be.equal(1);
        done();
      });
    });

    it('it should upvote recipe 3', function (done) {
      request.put('/api/v1/recipes/1/3').set('authorization', token).send({ upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body6 = res.body,
            userVote = _res$body6.userVote,
            message = _res$body6.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Voting successful');
        expect(userVote).to.be.an('object');
        expect(userVote.upVotes).to.be.equal(1);
        expect(userVote.userId).to.be.equal(1);
        done();
      });
    });

    it('it should toggle user upVotes on repeated click', function (done) {
      request.put('/api/v1/recipes/1/2').set('authorization', token).send({ upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body7 = res.body,
            userVote = _res$body7.userVote,
            message = _res$body7.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('');
        expect(userVote).to.be.an('object');
        expect(userVote.upVotes).to.be.equal(0);
        expect(userVote.userId).to.be.equal(1);
        done();
      });
    });

    it('it should down vote recipe 2', function (done) {
      request.put('/api/v1/recipes/1/2').set('authorization', token).send({ downVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body8 = res.body,
            userVote = _res$body8.userVote,
            message = _res$body8.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Voting successful');
        expect(userVote).to.be.an('object');
        expect(userVote.downVotes).to.be.equal(1);
        expect(userVote.upVotes).to.be.equal(0);
        expect(userVote.userId).to.be.equal(1);
        done();
      });
    });

    it('it should toggle user downVotes on repeated click', function (done) {
      request.put('/api/v1/recipes/1/2').set('authorization', token).send({ downVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body9 = res.body,
            userVote = _res$body9.userVote,
            message = _res$body9.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('');
        expect(userVote).to.be.an('object');
        expect(userVote.downVotes).to.be.equal(0);
        expect(userVote.userId).to.be.equal(1);
        done();
      });
    });

    it('it should sort recipe in descending order by upvotes', function (done) {
      request.get('/api/v1/recipes?sort=upVotes&order=desc').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var recipes = res.body.recipes;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(recipes).to.be.an('array');
        expect(recipes.length).to.be.equal(2);
        expect(recipes[0].id).to.be.equal(3);
        expect(recipes[1].id).to.be.equal(2);
        expect(recipes[0].upVotes).to.be.equal('1');
        expect(recipes[1].upVotes).to.be.equal('0');
        expect(recipes[0].name).to.be.equal('ThirdRecipe');
        expect(recipes[1].name).to.be.equal('SecondRecipe');
        done();
      });
    });

    it('it should sort recipe in ascending order by upvotes', function (done) {
      request.get('/api/v1/recipes?sort=upVotes&order=asc').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var recipes = res.body.recipes;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(recipes).to.be.an('array');
        expect(recipes.length).to.be.equal(2);
        expect(recipes[0].id).to.be.equal(2);
        expect(recipes[1].id).to.be.equal(3);
        expect(recipes[0].upVotes).to.be.equal('0');
        expect(recipes[1].upVotes).to.be.equal('1');
        expect(recipes[0].name).to.be.equal('SecondRecipe');
        expect(recipes[1].name).to.be.equal('ThirdRecipe');
        done();
      });
    });
  });

  /**
   * @function Recipe votes suite
   */
  describe('Unauthenticated user', function () {
    it('it should not create recipe for unauthenticated user', function (done) {
      request.post('/api/v1/recipes').set('authorization', 'unauth-token').send(_recipe.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('You are not authorized to perform this action');
        done();
      });
    });

    it('it should not modify or vote recipe for unauthenticated user', function (done) {
      request.put('/api/v1/recipes/1/2').set('authorization', 'unauth-token').send(_recipe.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('You are not authorized to perform this action');
        done();
      });
    });

    it('it should not delete recipe for unauthenticated user', function (done) {
      request.delete('/api/v1/recipes/1/2').set('authorization', 'unauth-token').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('You are not authorized to perform this action');
        done();
      });
    });
  });
});