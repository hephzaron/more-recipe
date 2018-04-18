import express from 'express';
import { RecipeController } from '../controllers';

const router = express.Router();

router.post('/recipes', RecipeController.addRecipe);

export default router;