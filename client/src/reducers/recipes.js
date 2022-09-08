import { createReducer } from '@reduxjs/toolkit';
import {
    createRecipe, updateRecipe, fetchRecipes, saveRecipe, fetchOneRecipe
} from '../actions/recipeActions';
import { initialRecipeState } from './initialState';

const recipeReducer = createReducer(initialRecipeState, (builder) => {
    builder.addCase(createRecipe.pending, (state) => ({ ...state, loading: 'pending' }));
    builder.addCase(createRecipe.fulfilled, (state, action) => ({
        ...state,
        recipe: action.payload.recipe,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(createRecipe.rejected, (state, action) => ({
        ...state,
        error: action.error['message'],
        loading: 'failed'
    }));

    builder.addCase(updateRecipe.pending, (state) => ({ ...state, loading: 'pending' }));
    builder.addCase(updateRecipe.fulfilled, (state, action) => ({
        ...state,
        recipe: action.payload.recipe,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(updateRecipe.rejected, (state, action) => ({
        ...state,
        error: action.error.message,
        loading: 'failed'
    }));

    builder.addCase(fetchRecipes.pending, (state) => ({
        ...state,
        error: '',
        loading: 'pending'
    }));
    builder.addCase(fetchRecipes.fulfilled, (state, action) => ({
        ...state,
        recipes: action.payload.recipes,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(fetchRecipes.rejected, (state, action) => ({
        ...state,
        error: action.error['message'],
        loading: 'failed'
    }));
    builder.addCase(saveRecipe.pending, (state) => ({
        ...state,
        error: '',
        loading: 'pending'
    }));
    builder.addCase(saveRecipe.rejected, (state, action) => ({
        ...state,
        error: action.error['message'],
        loading: 'failed'
    }));
    builder.addCase(saveRecipe.fulfilled, (state) => ({
        ...state,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(fetchOneRecipe.pending, (state) => ({
        ...state,
        error: '',
        loading: 'pending'
    }));
    builder.addCase(fetchOneRecipe.rejected, (state, action) => ({
        ...state,
        error: action.error['message'],
        loading: 'failed'
    }));
    builder.addCase(fetchOneRecipe.fulfilled, (state, action) => ({
        recipes: [...state.recipes, action.payload.recipe],
        recipe: action.payload.recipe,
        error: '',
        loading: 'fulfilled'
    }));
});

export default recipeReducer;
