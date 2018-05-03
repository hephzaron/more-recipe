import express from 'express';
import { Recipe, User } from '../controllers';

const router = express.Router();

router.post('/recipes', (req, res) => Recipe.addRecipe(req, res));
router.put('/recipes/:recipeId', (req, res) => Recipe.modifyRecipe(req, res));
router.delete('/recipes/:recipeId', (req, res) => Recipe.deleteRecipe(req, res));
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', (req, res) => Recipe.getAllRecipe(req, res));
router.post('/recipes/:recipeId/reviews', (req, res) => Recipe.addReview(req, res));
router.post('/signup', (req, res) => User.signup(req, res));
router.post('/login', (req, res) => User.login(req, res));
router.get('/users', (req, res) => User.getAllUsers(req, res));
router.put('/users/:userId', (req, res) => User.editUser(req, res));

export default router;