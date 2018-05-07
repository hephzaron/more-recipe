import express from 'express';
import { Recipe, User } from '../controllers';
import { UserAuth } from '../middlewares';

const router = express.Router();

router.post('/recipes', UserAuth.verifyUser, (req, res) => Recipe.addRecipe(req, res));
router.put('/recipes/:recipeId', UserAuth.verifyUser, (req, res) => Recipe.modifyRecipe(req, res));
router.delete('/recipes/:recipeId', UserAuth.verifyUser, (req, res) => Recipe.deleteRecipe(req, res));
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', (req, res) => Recipe.getAllRecipe(req, res));
router.post('/recipes/:recipeId/reviews', UserAuth.verifyUser, (req, res) => Recipe.addReview(req, res));
router.post('/signup', (req, res) => User.signup(req, res));
router.post('/login', (req, res) => User.login(req, res));
router.get('/users', (req, res) => User.getAllUsers(req, res));
router.put('/users/:userId', UserAuth.verifyUser, (req, res) => User.editUser(req, res));

export default router;