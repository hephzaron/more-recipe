import express from 'express';
import { Recipe } from '../controllers';

const router = express.Router();

router.post('/recipes', (req, res) => Recipe.addRecipe(req, res));
router.put('/recipes/:recipeId', (req, res) => Recipe.modifyRecipe(req, res));

export default router;