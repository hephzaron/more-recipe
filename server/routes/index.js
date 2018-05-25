import express from 'express';
import {
  RecipeController,
  UserController,
  ReviewController,
  ping
} from '../controllers';
import { UserAuth } from '../middlewares';

const router = express.Router();

router.get('/ping', (req, res) => ping(req, res));
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/users', UserController.getUsers);
router.put('/users/:userId', UserAuth.verifyUser, UserController.editUser);
router.post('/recipes', UserAuth.verifyUser, UserAuth.verifyUser, RecipeController.addRecipe);
router.put('/recipes/:userId/:recipeId', UserAuth.verifyUser, RecipeController.editRecipe);
router.delete('/recipes/:userId/:recipeId', UserAuth.verifyUser, RecipeController.deleteRecipe);
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', RecipeController.getRecipes);
router.get('/recipes/:recipeId', RecipeController.getRecipes);
router.post('/recipes/:recipeId/reviews', UserAuth.verifyUser, ReviewController.addReview);
router.put('/recipes/:recipeId/reviews/:reviewId', UserAuth.verifyUser, ReviewController.editReview);
router.delete('/recipes/:recipeId/reviews/:reviewId', UserAuth.verifyUser, ReviewController.deleteReview);

export default router;