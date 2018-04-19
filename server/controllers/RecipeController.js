import { Recipes as RecipeClass } from '../helpers/in-memory';

/**
 * Handles Recipe request operations
 * @class RecipeController
 * @param { null } void
 */
class RecipeController extends RecipeClass {
  /**
   * Adds a new recipe
   * @memberof RecipeController
   * @param { object } req -request
   * @param { object } res -respone
   * @returns { obejct } server response
   */
  addRecipe(req, res) {
    return super.create({...req.body })
      .then(recipe => res.status(201).send({
        recipe,
        message: `${recipe.name} added successfully`
      }))
      .catch(error => res.status(500).send({
        error,
        message: 'Internal Server Error'
      }));
  }

  /**
   * Modify a Recipe
   * @param {object} req
   * @param {object} res
   * @returns { promise } response
   */
  modifyRecipe(req, res) {
    const id = req.params.recipeId;
    return super.update({ id, ...req.body })
      .then(modifiedRecipe => res.status(200).send({
        recipe: modifiedRecipe,
        message: `Changes made on ${modifiedRecipe.name} is successfull`
      })).catch(error => res.status(500).send({
        error,
        message: 'Internal Server Error'
      }));
  }

  /**
   * Deletes a Recipe
   * @memberof RecipeController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  deleteRecipe(req, res) {
    const id = req.params.recipeId;
    return super.delete(id)
      .then(deletedRecipe => res.status(200).send({
        message: `${deletedRecipe.name} have been successfully removed`
      }))
      .catch(() => res.status(500).send('Internal Server Error'));
  }

  /**
   * Gets all Recipe
   * @memberof RecipeController
   * @param { object } req
   * @param { object } res
   * @returns { object } response
   */
  getAllRecipe(req, res) {
      return super.findAll({})
        .then(recipes => res.status(200).send({ recipes }))
        .catch(() => res.status(500).send({
          message: 'Internal Server Error'
        }));
    }
    /**
     * Adds a new review to recipe
     * @method addReview
     * @memberof ReviewController
     * @param { object } req
     * @param { object } res
     * @returns { object } response
     */
  addReview(req, res) {
    const { recipeId } = req.params;
    return super.createReview({ recipeId, ...req.body })
      .then(reviewedRecipe => res.status(201).send({
        recipe: reviewedRecipe,
        message: `You added a review to ${reviewedRecipe.name}`
      })).catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
}

export default RecipeController;