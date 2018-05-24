import express from 'express';
import { Recipe, UserController, ping } from '../controllers';
import { UserAuth } from '../middlewares';

const router = express.Router();

router.get('/ping', (req, res) => ping(req, res));
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/users', UserController.getUsers);
router.put('/users/:userId', UserAuth.verifyUser, UserController.editUser);
router.post('/recipes', UserAuth.verifyUser, (req, res) => Recipe.addRecipe(req, res));
router.put('/recipes/:recipeId', UserAuth.verifyUser, (req, res) => Recipe.modifyRecipe(req, res));
router.delete('/recipes/:recipeId', UserAuth.verifyUser, (req, res) => Recipe.deleteRecipe(req, res));
// To sort recipes, append '?sort=[Object key]&order=[desc or asc]'
router.get('/recipes', (req, res) => Recipe.getAllRecipe(req, res));
router.post('/recipes/:recipeId/reviews', UserAuth.verifyUser, (req, res) => Recipe.addReview(req, res));

export default router;