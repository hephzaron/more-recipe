import express from 'express';
import {
  RecipeController,
  UserController,
  ReviewController,
  SavedRecipeController,
  CloudinaryController,
  ping
} from '../controllers';
import { UserAuth, ManageVotes } from '../middlewares';

const {
  signup,
  login,
  getUsers,
  editUser,
  sendPasswordResetLink,
  resetPassword
} = UserController;

const {
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipes
} = RecipeController;

const {
  addReview,
  editReview,
  deleteReview
} = ReviewController;

const {
  saveRecipe,
  unsaveRecipe,
  getSavedRecipe
} = SavedRecipeController;

const { getCloudinarySignature, deleteCloudinaryImage } = CloudinaryController;

const { verifyUser } = UserAuth;

const { validateVotes } = ManageVotes;

const router = express.Router();

/**
 * User routes
 */
router.get('/ping', ping);
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
router.delete('/recipes/:userId/:recipeId', verifyUser, deleteRecipe);
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', getRecipes);
router.get('/recipes/:recipeId', getRecipes);
// Handle saved recipes
router.post('/recipes/save/:userId/:recipeId', verifyUser, saveRecipe);
router.delete('/recipes/unsave/:userId/:recipeId', verifyUser, unsaveRecipe);
router.get('/recipes/saved/:userId', verifyUser, getSavedRecipe);

/**
 * Review routes
 */
router.post('/recipes/:recipeId/reviews', verifyUser, addReview);
router.put('/recipes/:userId/reviews/:reviewId', verifyUser, editReview);
router.delete('/recipes/:userId/reviews/:reviewId', verifyUser, deleteReview);

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

export default router;