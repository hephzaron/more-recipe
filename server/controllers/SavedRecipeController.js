import models from '../models';
import ErrorHandler from '../helpers/ErrorHandler';

const { SavedRecipe, User, Recipe } = models;
const { handleErrors } = ErrorHandler;

/**
 * Handles saved recipe request operations
 * @class SavedRecipeController
 * @param { null } void
 */
class SavedRecipeController {
  /**
   * Saves a recipe
   * @memberof SavedRecipeController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  static saveRecipe(req, res) {
    const { recipeId, userId } = req.params;
    return SavedRecipe
      .create({
        recipeId,
        userId
      })
      .then(() => res.status(201).send({
        message: 'Recipe saved'
      }))
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }

  /**
   * Unsaves a recipe
   * @memberof SavedRecipeController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  static unsaveRecipe(req, res) {
    const { recipeId, userId } = req.params;
    return SavedRecipe
      .find({
        where: {
          recipeId,
          userId
        }
      })
      .then((userRecipe) => {
        if (!userRecipe) {
          return res.status(401).send({
            message: 'Recipe have never been saved'
          });
        }
        return SavedRecipe
          .destroy({
            where: {
              recipeId,
              userId
            }
          })
          .then(() => res.status(200).send({
            message: 'Recipe removed'
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
   * Get saved recipe
   * @memberof SavedRecipeController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  static getSavedRecipe(req, res) {
    const { userId } = req.params;
    return User
      .find({
        where: {
          id: userId
        },
        attributes: [
          'id',
          'email',
          'username'
        ],
        include: [
          { model: Recipe, as: 'savedRecipe' }
        ]
      })
      .then((user) => {
        const { savedRecipe } = user;
        if (savedRecipe.length <= 0) {
          return res.status(401).send({
            message: 'You have no saved recipe yet'
          });
        }
        return res.status(200).send({ savedRecipe });
      })
      .catch((error) => {
        const e = handleErrors(error);
        return res.status(e.statusCode).send({
          message: e.message
        });
      });
  }
}

export default SavedRecipeController;