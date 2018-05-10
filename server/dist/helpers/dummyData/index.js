'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userReviews = exports.reviewDetails = exports.ingredients = exports.ingredient = exports.recipeIngredients = exports.usersRecipes = exports.recipes = exports.recipeDetails = exports.users = exports.user = undefined;

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _ingredients = require('./ingredients');

var _ingredients2 = _interopRequireDefault(_ingredients);

var _recipes = require('./recipes');

var _recipes2 = _interopRequireDefault(_recipes);

var _reviews = require('./reviews');

var _reviews2 = _interopRequireDefault(_reviews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _User = (0, _users2.default)(),
    user = _User.user,
    users = _User.users;

var _Ingredients = (0, _ingredients2.default)(),
    recipeIngredients = _Ingredients.recipeIngredients,
    ingredient = _Ingredients.ingredient,
    ingredients = _Ingredients.ingredients;

var _Recipes = (0, _recipes2.default)(),
    recipeDetails = _Recipes.recipeDetails,
    recipes = _Recipes.recipes,
    usersRecipes = _Recipes.usersRecipes;

var _Reviews = (0, _reviews2.default)(),
    reviewDetails = _Reviews.reviewDetails,
    userReviews = _Reviews.userReviews;

exports.user = user;
exports.users = users;
exports.recipeDetails = recipeDetails;
exports.recipes = recipes;
exports.usersRecipes = usersRecipes;
exports.recipeIngredients = recipeIngredients;
exports.ingredient = ingredient;
exports.ingredients = ingredients;
exports.reviewDetails = reviewDetails;
exports.userReviews = userReviews;