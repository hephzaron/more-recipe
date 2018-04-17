import User from './users';
import Ingredients from './ingredients';
import Recipes from './recipes';
import Reviews from './reviews';

const { user, users } = User();
const { recipeIngredients, ingredient, ingredients } = Ingredients();
const { recipe, recipes, usersRecipes } = Recipes();
const { review, userReviews } = Reviews();

export {
  user,
  users,
  recipe,
  recipes,
  usersRecipes,
  recipeIngredients,
  ingredient,
  ingredients,
  review,
  userReviews
};