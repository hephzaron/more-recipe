import express from 'express';
import { Recipe } from '../controllers';

const router = express.Router();

router.post('/recipes', (req, res) => Recipe.addRecipe(req, res));
router.put('/recipes/:recipeId', (req, res) => Recipe.modifyRecipe(req, res));
router.delete('/recipes/:recipeId', (req, res) => Recipe.deleteRecipe(req, res));
router.get('/recipes', (req, res) => Recipe.getAllRecipe(req, res));
router.post('/recipes/:recipeId/reviews', (req, res) => Recipe.addReview(req, res));

export default router;