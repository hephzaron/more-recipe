import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/server';
import { user, users } from '../seeds/user';
import { recipeDetails } from '../seeds/recipe';
import { generateToken, seedUserTable } from '../seeds';

const { expect } = chai;
const request = supertest(app);


describe('Recipe', () => {
  before((done) => {
    seedUserTable(done);
  });
  const { token } = generateToken(user.email);
  /**
   * @function Recipe actions suite
   */

  describe('# Recipe actions', () => {
    it(
      'it should post recipe',
      (done) => {
        request
          .post('/api/v1/recipes')
          .set('authorization', token)
          .send(recipeDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.equal(`${recipeDetails.name} added successfully`);
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(1);
            expect(recipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should post a second recipe',
      (done) => {
        request
          .post('/api/v1/recipes')
          .set('authorization', token)
          .send({...recipeDetails, name: 'SecondRecipe', userId: 2 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('SecondRecipe added successfully');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(2);
            expect(recipe.userId).to.be.equal(2);
            done();
          });
      }
    );

    it(
      'it should post a third recipe',
      (done) => {
        request
          .post('/api/v1/recipes')
          .set('authorization', token)
          .send({...recipeDetails, name: 'ThirdRecipe', userId: 3 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('ThirdRecipe added successfully');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(3);
            expect(recipe.userId).to.be.equal(3);
            done();
          });
      }
    );

    it(
      'it should get all recipes',
      (done) => {
        request
          .get('/api/v1/recipes')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipes } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(recipes).to.be.an('array');
            expect(recipes.length).to.be.equal(3);
            expect(recipes[0].id).to.be.equal(1);
            expect(recipes[1].id).to.be.equal(2);
            expect(recipes[2].id).to.be.equal(3);
            expect(recipes[0].name).to.be.equal(recipeDetails.name);
            expect(recipes[1].name).to.be.equal('SecondRecipe');
            expect(recipes[2].name).to.be.equal('ThirdRecipe');
            done();
          });
      }
    );

    it(
      'it should get a single recipe',
      (done) => {
        request
          .get('/api/v1/recipes/1')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(1);
            expect(recipe.name).to.be.equal(recipeDetails.name);
            done();
          });
      }
    );

    it(
      'it should modify a recipe',
      (done) => {
        request
          .put('/api/v1/recipes/1/1')
          .set('authorization', token)
          .send({ name: 'RecipeNameChanged' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { updatedRecipe, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('RecipeNameChanged has been updated successfully');
            expect(updatedRecipe).to.be.an('object');
            expect(updatedRecipe.id).to.be.equal(1);
            expect(updatedRecipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should delete recipe',
      (done) => {
        request
          .delete('/api/v1/recipes/1/1')
          .set('authorization', token)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.not.have.key('recipe');
            expect(res.body).to.have.keys(['message']);
            expect(message).to.equal('Recipe deleted successfully');
            done();
          });
      }
    );

    it(
      'it should get all recipes after delete',
      (done) => {
        request
          .get('/api/v1/recipes')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipes } = res.body;
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
      }
    );
  });

  /**
   * @function Recipe votes suite
   */
  describe('Recipe Votes', () => {
    it(
      'it should not allow recipe\'s author to vote own recipe',
      (done) => {
        request
          .put('/api/v1/recipes/2/2')
          .set('authorization', generateToken(users[0].email).token)
          .send({ upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('You are not allowed to vote your own recipe');
            done();
          });
      }
    );

    it(
      'it should upvote recipe 2',
      (done) => {
        request
          .put('/api/v1/recipes/1/2')
          .set('authorization', token)
          .send({ upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userVote, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Voting successful');
            expect(userVote).to.be.an('object');
            expect(userVote.upVotes).to.be.equal(1);
            expect(userVote.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should upvote recipe 3',
      (done) => {
        request
          .put('/api/v1/recipes/1/3')
          .set('authorization', token)
          .send({ upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userVote, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Voting successful');
            expect(userVote).to.be.an('object');
            expect(userVote.upVotes).to.be.equal(1);
            expect(userVote.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should toggle user upVotes on repeated click',
      (done) => {
        request
          .put('/api/v1/recipes/1/2')
          .set('authorization', token)
          .send({ upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userVote, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('');
            expect(userVote).to.be.an('object');
            expect(userVote.upVotes).to.be.equal(0);
            expect(userVote.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should down vote recipe 2',
      (done) => {
        request
          .put('/api/v1/recipes/1/2')
          .set('authorization', token)
          .send({ downVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userVote, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Voting successful');
            expect(userVote).to.be.an('object');
            expect(userVote.downVotes).to.be.equal(1);
            expect(userVote.upVotes).to.be.equal(0);
            expect(userVote.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should toggle user downVotes on repeated click',
      (done) => {
        request
          .put('/api/v1/recipes/1/2')
          .set('authorization', token)
          .send({ downVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userVote, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('');
            expect(userVote).to.be.an('object');
            expect(userVote.downVotes).to.be.equal(0);
            expect(userVote.userId).to.be.equal(1);
            done();
          });
      }
    );


    it(
      'it should sort recipe in descending order by upvotes',
      (done) => {
        request
          .get('/api/v1/recipes?sort=upVotes&order=desc')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipes } = res.body;
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
      }
    );

    it(
      'it should sort recipe in ascending order by upvotes',
      (done) => {
        request
          .get('/api/v1/recipes?sort=upVotes&order=asc')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipes } = res.body;
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
      }
    );
  });

  /**
   * @function Recipe votes suite
   */
  describe('Unauthenticated user', () => {
    it(
      'it should not create recipe for unauthenticated user',
      (done) => {
        request
          .post('/api/v1/recipes')
          .set('authorization', 'unauth-token')
          .send(recipeDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('You are not authorized to perform this action');
            done();
          });
      }
    );

    it(
      'it should not modify or vote recipe for unauthenticated user',
      (done) => {
        request
          .put('/api/v1/recipes/1/2')
          .set('authorization', 'unauth-token')
          .send(recipeDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('You are not authorized to perform this action');
            done();
          });
      }
    );

    it(
      'it should not delete recipe for unauthenticated user',
      (done) => {
        request
          .delete('/api/v1/recipes/1/2')
          .set('authorization', 'unauth-token')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('You are not authorized to perform this action');
            done();
          });
      }
    );
  });
});