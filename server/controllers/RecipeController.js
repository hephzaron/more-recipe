import { Recipes as RecipeClass } from '../helpers/in-memory';

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
    const { userId, name, description } = req.body;
    const Recipes = new RecipeClass();
    Recipes.create({ userId, name, description })
      .then(recipe => res.status(201).send({
        recipe,
        message: `${recipe.name} added successfully`
      }))
      .catch(() => res.status(500).send({
        message: 'Internal Server Error'
      }));
  }
}

export default RecipeController;