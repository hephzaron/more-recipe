import chai from 'chai';
import supertest from 'supertest';
import app from '../../src/server';
import { user, recipeDetails, reviewDetails } from '../../helpers/dummyData';

const { expect } = chai;
const request = supertest(app);


describe('Recipe', () => {
  /**
   * @function User authenticate suite
   */
  describe('# Authenticate user', () => {
    it(
      'it should authorize user after signup',
      (done) => {
        request
          .post('/api/v1/signup')
          .send({...user, email: 'mymail@mail.com' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { userPayload, message } = res.body;
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
      }
    );
  });

  /**
   * @function Recipe actions suite
   */

  describe('# Recipe actions', () => {
    it(
      'it should post recipe',
      (done) => {
        const { token } = global.user;
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
        const { token } = global.user;
        request
          .post('/api/v1/recipes')
          .set('authorization', token)
          .send({...recipeDetails, name: 'SecondRecipe' })
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
            expect(recipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should post a third recipe',
      (done) => {
        const { token } = global.user;
        request
          .post('/api/v1/recipes')
          .set('authorization', token)
          .send({...recipeDetails, name: 'ThirdRecipe' })
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
            expect(recipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should review second recipe',
      (done) => {
        const { token } = global.user;
        request
          .post('/api/v1/recipes/2/reviews')
          .set('authorization', token)
          .send(reviewDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(message).to.be.equal('You added a review to SecondRecipe');
            expect(recipe.reviews).to.be.an('array');
            expect(recipe.reviews.length).to.be.equal(1);
            expect(recipe.reviews[0].id).to.be.equal(1);
            expect(recipe.reviews[0].description).to.be.equal(reviewDetails.description);
            expect(recipe.name).to.be.equal('SecondRecipe');
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
      'it should modify a recipe',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/1')
          .set('authorization', token)
          .send({ name: 'RecipeNameChanged' })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Changes made on RecipeNameChanged is successfull');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(1);
            expect(recipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should delete recipe',
      (done) => {
        const { token } = global.user;
        request
          .delete('/api/v1/recipes/1')
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
            expect(message).to.equal('RecipeNameChanged have been successfully removed');
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
      'it should not allow recipe\'s author to vote on own recipe',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: recipeDetails.userId, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(403);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('The Creator of a recipe is not allowed to vote');
            done();
          });
      }
    );

    it(
      'it should upvote recipe 2',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Changes made on SecondRecipe is successfull');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(2);
            expect(recipe.upVotes).to.be.equal(1);
            expect(recipe.userId).to.be.equal(1);
            done();
          });
      }
    );

    it(
      'it should not allow user to upvote twice',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Sorry! You have voted before');
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
            expect(recipes[0].id).to.be.equal(2);
            expect(recipes[1].id).to.be.equal(3);
            expect(recipes[0].upVotes).to.be.equal(1);
            expect(recipes[1].upVotes).to.be.equal(0);
            expect(recipes[0].name).to.be.equal('SecondRecipe');
            expect(recipes[1].name).to.be.equal('ThirdRecipe');
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
            expect(recipes[0].id).to.be.equal(3);
            expect(recipes[1].id).to.be.equal(2);
            expect(recipes[0].upVotes).to.be.equal(0);
            expect(recipes[1].upVotes).to.be.equal(1);
            expect(recipes[0].name).to.be.equal('ThirdRecipe');
            expect(recipes[1].name).to.be.equal('SecondRecipe');
            done();
          });
      }
    );

    it(
      'it should decrement upvotes, if same user downvotes recipe',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, downVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
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
      }
    );

    it(
      'it should not allow user to downvote twice',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, downVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Sorry! You have voted before');
            done();
          });
      }
    );

    it(
      'it should decrement downvotes, if same user upvotes recipe',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
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
      }
    );

    it(
      'it should not allow user to upvote twice',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 2, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(409);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Sorry! You have voted before');
            done();
          });
      }
    );

    it(
      'it should increment upvotes on subsequent upvotes',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 3, upVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Changes made on SecondRecipe is successfull');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(2);
            expect(recipe.downVotes).to.be.equal(0);
            expect(recipe.upVotes).to.be.equal(2);
            done();
          });
      }
    );

    it(
      'it should increment downvotes on subsequent downvotes',
      (done) => {
        const { token } = global.user;
        request
          .put('/api/v1/recipes/2')
          .set('authorization', token)
          .send({ userId: 4, downVotes: 1 })
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { recipe, message } = res.body;
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Changes made on SecondRecipe is successfull');
            expect(recipe).to.be.an('object');
            expect(recipe.id).to.be.equal(2);
            expect(recipe.downVotes).to.be.equal(1);
            expect(recipe.upVotes).to.be.equal(2);
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
            expect(message).to.equal('Token invalid or expired-user not found');
            done();
          });
      }
    );

    it(
      'it should not modify or vote recipe for unauthenticated user',
      (done) => {
        request
          .put('/api/v1/recipes/2')
          .set('authorization', 'unauth-token')
          .send(recipeDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Token invalid or expired-user not found');
            done();
          });
      }
    );

    it(
      'it should not delete recipe for unauthenticated user',
      (done) => {
        request
          .delete('/api/v1/recipes/1')
          .set('authorization', 'unauth-token')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            const { message } = res.body;
            expect(res.statusCode).to.equal(401);
            expect(res.body).to.be.an('object');
            expect(message).to.equal('Token invalid or expired-user not found');
            done();
          });
      }
    );
  });
});