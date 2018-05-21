import RecipeController from './RecipeController';
import UserController from './UserController';
import ping from './ping';

const Recipe = new RecipeController();
const User = new UserController();

export {
  Recipe,
  User,
  ping
};