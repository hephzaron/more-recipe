"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signup = _controllers.UserController.signup,
    login = _controllers.UserController.login,
    getUsers = _controllers.UserController.getUsers,
    editUser = _controllers.UserController.editUser,
    sendPasswordResetLink = _controllers.UserController.sendPasswordResetLink,
    resetPassword = _controllers.UserController.resetPassword;
var addRecipe = _controllers.RecipeController.addRecipe,
    editRecipe = _controllers.RecipeController.editRecipe,
    deleteRecipe = _controllers.RecipeController.deleteRecipe,
    getRecipes = _controllers.RecipeController.getRecipes;
var addReview = _controllers.ReviewController.addReview,
    editReview = _controllers.ReviewController.editReview,
    deleteReview = _controllers.ReviewController.deleteReview;
var saveRecipe = _controllers.SavedRecipeController.saveRecipe,
    unsaveRecipe = _controllers.SavedRecipeController.unsaveRecipe,
    getSavedRecipe = _controllers.SavedRecipeController.getSavedRecipe;
var getCloudinarySignature = _controllers.CloudinaryController.getCloudinarySignature,
    deleteCloudinaryImage = _controllers.CloudinaryController.deleteCloudinaryImage;
var verifyUser = _middlewares.UserAuth.verifyUser;
var validateVotes = _middlewares.ManageVotes.validateVotes;

var router = _express["default"].Router();
/**
 * User routes
 */


router.get('/ping', _controllers.ping);
router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/users/:userId', getUsers);
router.put('/users/:userId', verifyUser, editUser);
/**
 * Recipe routes
 */

router.post('/recipes', verifyUser, addRecipe);
router.put('/recipes/:userId/:recipeId', verifyUser, editRecipe, validateVotes);
router["delete"]('/recipes/:userId/:recipeId', verifyUser, deleteRecipe); // To sort recipes, append '?sort=[Object key]&order=[desc or asc]'

router.get('/recipes', getRecipes);
router.get('/recipes/:recipeId', getRecipes); // Handle saved recipes

router.post('/recipes/save/:userId/:recipeId', verifyUser, saveRecipe);
router["delete"]('/recipes/unsave/:userId/:recipeId', verifyUser, unsaveRecipe);
router.get('/recipes/saved/:userId', verifyUser, getSavedRecipe);
/**
 * Review routes
 */

router.post('/recipes/:recipeId/reviews', verifyUser, addReview);
router.put('/recipes/:userId/reviews/:reviewId', verifyUser, editReview);
router["delete"]('/recipes/:userId/reviews/:reviewId', verifyUser, deleteReview);
/**
 * Recover password routes
 */

router.post('/users/reset_password', sendPasswordResetLink);
router.post('/auth/reset_password', resetPassword);
/**
 * Get cloudinary credentials
 */

router.get('/upload/sign', verifyUser, getCloudinarySignature);
router.post('/delete/upload', verifyUser, deleteCloudinaryImage);
var _default = router;
exports["default"] = _default;