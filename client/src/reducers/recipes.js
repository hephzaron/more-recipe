import { createReducer } from '@reduxjs/toolkit';
import { createRecipe, updateRecipe, fetchRecipes } from '../actions/recipeActions';
import { initialRecipeState } from './initialState';

export const createRecipeReducer = createReducer(initialRecipeState, (builder) => {
    builder.addCase(createRecipe.pending, (state) => ({
        ...state,
        recipe: {},
        loading: 'pending'
    }));
    builder.addCase(createRecipe.fulfilled, (state, action) => ({
        ...state,
        recipe: action.payload.recipe,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(createRecipe.rejected, (state, action) => ({
        ...state,
        recipe: {},
        error: action.payload['message'],
        loading: 'failed'
    }));
});

export const updateRecipeReducer = createReducer(initialRecipeState, (builder) => {
    builder.addCase(updateRecipe.pending, (state) => ({
        ...state,
        recipe: {},
        loading: 'pending'
    }));
    builder.addCase(updateRecipe.fulfilled, (state, action) => ({
        ...state,
        recipe: action.payload.recipe,
        error: '',
        loading: 'fulfilled'
    }));
    builder.addCase(updateRecipe.rejected, (state, action) => ({
        ...state,
        recipe: {},
        error: action.payload['message'],
        loading: 'failed'
    }));
});

export const fetchRecipesReducer = createReducer(initialRecipeState, (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => ({
        ...state,
        recipes: [],
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
        recipes: [],
        error: action.payload['message'],
        loading: 'failed'
    }));
});
