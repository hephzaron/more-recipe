import express from 'express';
import { Recipe } from '../controllers';

const router = express.Router();

router.post('/recipes', (req, res) => Recipe.addRecipe(req, res));

export default router;