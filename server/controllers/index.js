import RecipeController from './RecipeController';
import UserController from './UserController';
import ping from './ping';

const Recipe = new RecipeController();

export {
  Recipe,
  UserController,
  ping
};