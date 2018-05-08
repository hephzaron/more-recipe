import chai from 'chai';
import supertest from 'supertest';
import app from '../../src';
import { user, recipeDetails } from '../../helpers/dummyData';

const { expect } = chai;
const request = supertest(app);


let authorization;
describe('/POST Authorize User', () => {
  it('it should authorize user after signup', (done) => {
    request
      .post('/api/v1/signup')
      .send({...user, email: 'mymail@mail.com' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        const { userPayload, message } = res.body;
        authorization = userPayload.token;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(message).to.equal('Your account has been created successfully');
        expect(userPayload).to.be.an('object');
        expect(userPayload).to.have.keys(['user', 'token']);
        expect(userPayload.user.id).to.be.equal(1);
        expect(userPayload.user.email).to.be.equal('mymail@mail.com');
        done();
      });
  });
});

describe('Recipe', () => {
  it('it should post recipe', (done) => {
    request
      .post('/api/v1/recipes')
      .set('authorization', authorization)
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
  });

  it('it should post a second recipe', (done) => {
    request
      .post('/api/v1/recipes')
      .set('authorization', authorization)
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
  });

  it('it should get all recipes', (done) => {
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
        expect(recipes[0].id).to.be.equal(1);
        expect(recipes[1].id).to.be.equal(2);
        expect(recipes[0].name).to.be.equal(recipeDetails.name);
        expect(recipes[1].name).to.be.equal('SecondRecipe');
        done();
      });
  });

  it('it should modify a recipe', (done) => {
    request
      .put('/api/v1/recipes/1')
      .set('authorization', authorization)
      .send({...recipeDetails, name: 'RecipeNameChanged' })
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
  });

  it('it should delete recipe', (done) => {
    request
      .delete('/api/v1/recipes/1')
      .set('authorization', authorization)
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
  });

  it('it should get all recipes after delete', (done) => {
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
        expect(recipes.length).to.be.equal(1);
        expect(recipes[0].id).to.be.equal(2);
        expect(recipes[0].name).to.be.equal('SecondRecipe');
        done();
      });
  });
});