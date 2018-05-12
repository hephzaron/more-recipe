'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../../src/server');

var _server2 = _interopRequireDefault(_server);

var _dummyData = require('../../helpers/dummyData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var request = (0, _supertest2.default)(_server2.default);

describe('Recipe', function () {
  /**
   * @function User authenticate suite
   */
  describe('# Authenticate user', function () {
    it('it should authorize user after signup', function (done) {
      request.post('/api/v1/signup').send(_extends({}, _dummyData.user, { email: 'mymail@mail.com' })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body = res.body,
            userPayload = _res$body.userPayload,
            message = _res$body.message;

        global.user = userPayload;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Your account has been created successfully');
        expect(userPayload).to.be.an('object');
        expect(userPayload).to.have.keys(['user', 'token']);
        expect(userPayload.user.id).to.be.equal(2);
        expect(userPayload.user.email).to.be.equal('mymail@mail.com');
        done();
      });
    });
  });

  /**
   * @function Recipe actions suite
   */

  describe('# Recipe actions', function () {
    it('it should post recipe', function (done) {
      var token = global.user.token;

      request.post('/api/v1/recipes').set('authorization', token).send(_dummyData.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body2 = res.body,
            recipe = _res$body2.recipe,
            message = _res$body2.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal(_dummyData.recipeDetails.name + ' added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(1);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should post a second recipe', function (done) {
      var token = global.user.token;

      request.post('/api/v1/recipes').set('authorization', token).send(_extends({}, _dummyData.recipeDetails, { name: 'SecondRecipe' })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body3 = res.body,
            recipe = _res$body3.recipe,
            message = _res$body3.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('SecondRecipe added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should post a third recipe', function (done) {
      var token = global.user.token;

      request.post('/api/v1/recipes').set('authorization', token).send(_extends({}, _dummyData.recipeDetails, { name: 'ThirdRecipe' })).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body4 = res.body,
            recipe = _res$body4.recipe,
            message = _res$body4.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('ThirdRecipe added successfully');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(3);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should review second recipe', function (done) {
      var token = global.user.token;

      request.post('/api/v1/recipes/2/reviews').set('authorization', token).send(_dummyData.reviewDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body5 = res.body,
            recipe = _res$body5.recipe,
            message = _res$body5.message;

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.be.equal('You added a review to SecondRecipe');
        expect(recipe.reviews).to.be.an('array');
        expect(recipe.reviews.length).to.be.equal(1);
        expect(recipe.reviews[0].id).to.be.equal(1);
        expect(recipe.reviews[0].description).to.be.equal(_dummyData.reviewDetails.description);
        expect(recipe.name).to.be.equal('SecondRecipe');
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
        expect(recipes[0].name).to.be.equal(_dummyData.recipeDetails.name);
        expect(recipes[1].name).to.be.equal('SecondRecipe');
        expect(recipes[2].name).to.be.equal('ThirdRecipe');
        done();
      });
    });

    it('it should modify a recipe', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/1').set('authorization', token).send({ name: 'RecipeNameChanged' }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body6 = res.body,
            recipe = _res$body6.recipe,
            message = _res$body6.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on RecipeNameChanged is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(1);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should delete recipe', function (done) {
      var token = global.user.token;

      request.delete('/api/v1/recipes/1').set('authorization', token).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.have.key('recipe');
        expect(res.body).to.have.keys(['message']);
        expect(message).to.equal('RecipeNameChanged have been successfully removed');
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
    it('it should not allow recipe\'s author to vote on own recipe', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: _dummyData.recipeDetails.userId, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('The Creator of a recipe is not allowed to vote');
        done();
      });
    });

    it('it should upvote recipe 2', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body7 = res.body,
            recipe = _res$body7.recipe,
            message = _res$body7.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on SecondRecipe is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.upVotes).to.be.equal(1);
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should not allow user to upvote twice', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Sorry! You have voted before');
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
        expect(recipes[0].id).to.be.equal(2);
        expect(recipes[1].id).to.be.equal(3);
        expect(recipes[0].upVotes).to.be.equal(1);
        expect(recipes[1].upVotes).to.be.equal(0);
        expect(recipes[0].name).to.be.equal('SecondRecipe');
        expect(recipes[1].name).to.be.equal('ThirdRecipe');
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
        expect(recipes[0].id).to.be.equal(3);
        expect(recipes[1].id).to.be.equal(2);
        expect(recipes[0].upVotes).to.be.equal(0);
        expect(recipes[1].upVotes).to.be.equal(1);
        expect(recipes[0].name).to.be.equal('ThirdRecipe');
        expect(recipes[1].name).to.be.equal('SecondRecipe');
        done();
      });
    });

    it('it should decrement upvotes, if same user downvotes recipe', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, downVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body8 = res.body,
            recipe = _res$body8.recipe,
            message = _res$body8.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on SecondRecipe is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.upVotes).to.be.equal(0); // decrement upVotes
        expect(recipe.downVotes).to.be.equal(1); // increment downvotes
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should not allow user to downvote twice', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, downVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Sorry! You have voted before');
        done();
      });
    });

    it('it should decrement downvotes, if same user upvotes recipe', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body9 = res.body,
            recipe = _res$body9.recipe,
            message = _res$body9.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on SecondRecipe is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.downVotes).to.be.equal(0); // decrement downVotes
        expect(recipe.upVotes).to.be.equal(1); // increment upvotes
        expect(recipe.userId).to.be.equal(1);
        done();
      });
    });

    it('it should not allow user to upvote twice', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 2, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Sorry! You have voted before');
        done();
      });
    });

    it('it should increment upvotes on subsequent upvotes', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 3, upVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body10 = res.body,
            recipe = _res$body10.recipe,
            message = _res$body10.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on SecondRecipe is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.downVotes).to.be.equal(0);
        expect(recipe.upVotes).to.be.equal(2);
        done();
      });
    });

    it('it should increment downvotes on subsequent downvotes', function (done) {
      var token = global.user.token;

      request.put('/api/v1/recipes/2').set('authorization', token).send({ userId: 4, downVotes: 1 }).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var _res$body11 = res.body,
            recipe = _res$body11.recipe,
            message = _res$body11.message;

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Changes made on SecondRecipe is successfull');
        expect(recipe).to.be.an('object');
        expect(recipe.id).to.be.equal(2);
        expect(recipe.downVotes).to.be.equal(1);
        expect(recipe.upVotes).to.be.equal(2);
        done();
      });
    });
  });

  /**
   * @function Recipe votes suite
   */
  describe('Unauthenticated user', function () {
    it('it should not create recipe for unauthenticated user', function (done) {
      request.post('/api/v1/recipes').set('authorization', 'unauth-token').send(_dummyData.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Token invalid or expired-user not found');
        done();
      });
    });

    it('it should not modify or vote recipe for unauthenticated user', function (done) {
      request.put('/api/v1/recipes/2').set('authorization', 'unauth-token').send(_dummyData.recipeDetails).end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Token invalid or expired-user not found');
        done();
      });
    });

    it('it should not delete recipe for unauthenticated user', function (done) {
      request.delete('/api/v1/recipes/1').set('authorization', 'unauth-token').end(function (err, res) {
        if (err) {
          return done(err);
        }
        var message = res.body.message;

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Token invalid or expired-user not found');
        done();
      });
    });
  });
});