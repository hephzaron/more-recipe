import Sequelize from 'sequelize';
import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';
import { ManageVotes } from '../middlewares';

const { Recipe, Review, RecipeVote } = models;
const { restrictCreator } = ManageVotes;
const { handleErrors } = ErrorHandler;
const { Op } = Sequelize;
/**
 * Handles Recipe request operations
 * @class RecipeController
 * @param { null } void
 */
class RecipeController {
  /**
   * Adds a new recipe
   * @memberof RecipeController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  static addRecipe(req, res) {
    const { name } = req.body;
    return Recipe
      .findOne({
        where: {
          name
        }
      })
      .then((recipe) => {
        if (recipe) {
          return res.status(409).send({
            message: 'A recipe with the same name already exist, you can add a review to existing recipe '
          });
        }
        return Recipe
          .create(req.body, {
            fields: [
              'userId',
              'name',
              'description',
              'photoUrl'
            ],
            returning: true
          })
          .then(newRecipe =>
            Review.create({
              parentId: 0,
              recipeId: parseInt(newRecipe.id, 10),
              userId: parseInt(newRecipe.userId, 10),
              description: newRecipe.description
            }).then(() => res.status(201).send({
              recipe: newRecipe,
              message: `${newRecipe.name} added succesfully`
            })).catch((error) => {
              const e = handleErrors(error);
              return res.status(e.statusCode).send({
                message: e.message
              });
            }))
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Edit a Recipe
   * @param {object} req
   * @param {object} res
   * @param { function } next
   * @returns { promise } response
   */
  static editRecipe(req, res, next) {
    const { recipeId, userId } = req.params;
    const {
      upVotes,
      downVotes,
      likes,
      dislikes
    } = req.body;
    return Recipe
      .findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe does not exist'
          });
        }
        if ((recipe.userId !== parseInt(userId, 10)) &&
          !(upVotes || downVotes || likes || dislikes)) {
          return res.status(403).send({
            message: 'You are not allowed to modify this recipe. Please add a review instead'
          });
        }
        const { shouldVote } = restrictCreator(recipe, userId);
        if (!shouldVote && (upVotes || downVotes)) {
          return res.status(403).send({
            message: 'You are not allowed to vote your own recipe'
          });
        }
        if (upVotes || downVotes || likes || dislikes) {
          return next();
        }
        return recipe
          .update(req.body, {
            fields: [
              'name',
              'description',
              'photoUrl',
              'favorites'
            ],
            returning: true
          })
          .then(updatedRecipe => res.status(200).send({
            updatedRecipe,
            message: `${updatedRecipe.name} have been updated successfully`
          }))
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      }).catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Deletes a Recipe
   * @memberof RecipeController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  static deleteRecipe(req, res) {
    const { userId, recipeId } = req.params;
    return Recipe
      .findById(recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe does not exist'
          });
        }
        if (recipe.userId !== parseInt(userId, 10)) {
          return res.status(403).send({
            message: 'You are not allowed to delete this recipe.'
          });
        }
        return Recipe
          .destroy({
            where: {
              id: recipeId
            }
          }).then(() => res.status(200).send({
            message: 'Recipe deleted successfully'
          }))
          .catch((error) => {
            const e = handleErrors(error);
            return res.status(e.statusCode).send({
              message: e.message
            });
          });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Gets Recipe
   * @memberof RecipeController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  static getRecipes(req, res) {
    const {
      sort,
      order,
      limit,
      offset
    } = req.query;
    const { recipeId } = req.params;
    const options = {
      where: recipeId ? {
        id: recipeId
      } : {},
      limit: limit || 4,
      offset: offset || 0,
      order: [
        [
          sort || 'id',
          order || 'ASC'
        ]
      ],
      include: [{
        model: Review
      }, {
        model: RecipeVote,
        where: {
          [Op.or]: [
            { upVotes: true },
            { downVotes: true },
            { likes: true },
            { dislikes: true }
          ]
        }
      }]
    };
    return Recipe
      .findAll(options)
      .then((recipes) => {
        if (!recipes || recipes.length === 0) {
          return res.status(200).send({
            message: 'Oops! No recipe exists in this selection'
          });
        }
        return res.status(200).send({ recipes });
      }).catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default RecipeController;