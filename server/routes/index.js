import express from 'express';
import {
  RecipeController,
  UserController,
  ReviewController,
  ping
} from '../controllers';
import { UserAuth, ManageVotes } from '../middlewares';

const {
  signup,
  login,
  getUsers,
  editUser
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
const { verifyUser } = UserAuth;
const { validateVotes } = ManageVotes;

const router = express.Router();

router.get('/ping', (req, res) => ping(req, res));
router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.put('/users/:userId', verifyUser, editUser);
router.post('/recipes', verifyUser, addRecipe);
router.put('/recipes/:userId/:recipeId', verifyUser, editRecipe, validateVotes);
router.delete('/recipes/:userId/:recipeId', verifyUser, deleteRecipe);
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', getRecipes);
router.get('/recipes/:recipeId', getRecipes);
router.post('/recipes/:recipeId/reviews', verifyUser, addReview);
router.put('/recipes/:userId/reviews/:reviewId', verifyUser, editReview);
router.delete('/recipes/:userId/reviews/:reviewId', verifyUser, deleteReview);

export default router;