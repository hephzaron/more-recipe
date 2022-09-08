/* eslint-disable no-shadow */
import axios from 'axios';
import dotEnv from 'dotenv';
import { createAsyncThunk } from '@reduxjs/toolkit';

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * Get recipes
 * @description Get recipes from server
 * @param {String} offset - offset query to fetch paginated items
 * @returns { promise } -Axios http response
 */
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipesStatus',
    async (offset = 0) => {
        try {
            const limit = 40;
            const sort = 'createdAt';
            const order = 'DESC';
            const response = await axios.get(
                `${SERVER_URL}/recipes?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`
                );
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * Get one recipe
 * @description Get a recipe from server
 * @param {String} offset - offset query to fetch paginated items
 * @returns { promise } -Axios http response
 */
 export const fetchOneRecipe = createAsyncThunk(
    'recipes/fetchOneRecipeStatus',
    async ({ id }) => {
        try {
            const response = await axios.get(`${SERVER_URL}/recipes/${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * Get user saved recipes
 * @description Get saved recipes from server
 * @param {String} offset - offset query to fetch paginated items
 * @param {String} userId - Id of user that saved recipe
 * @returns { promise } -Axios http response
 */
 export const fetchSavedRecipes = createAsyncThunk(
    'recipes/fetchSavedRecipesStatus',
    async (offset = 0, userId) => {
        try {
            const limit = 40;
            const sort = 'createdAt';
            const order = 'DESC';
            const response = await axios.get(
                `${SERVER_URL}/recipes/saved/${userId}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`
                );
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * createRecipe
 * @description creates a recipe
 * @param {object} recipe - recipe payload to be created
 * @returns { promise } -Axios http response from the server
 */
export const createRecipe = createAsyncThunk(
    'recipes/createRecipeStatus',
    async (recipe) => {
        try {
            const {
                userId, name, description, photoUrl
            } = recipe;
            const response = await axios.post(`${SERVER_URL}/recipes`, {
                userId,
                name: name[0],
                description: description[0],
                photoUrl
            });
            return response.data;
        } catch (error) {
            /** handle error response sent from App server and cloudinary */
            if (error.response && error.response.status > 201) {
                /** Return error response on failed request to cloudinary*/
                if (error.response.data.error) {
                    return Promise.reject(error.response.data.error);
                }
                return Promise.reject(error.response.data);
            }
            /** Error handler for network error */
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * @function updateRecipe
 * @description updates a recipe
 * @param {object} recipe - recipe payload to be updated
 * @returns { promise } -Axios http response from the server
 */
export const updateRecipe = createAsyncThunk(
    'recipes/updateRecipeStatus',
    async ({ userId, recipe }) => {
        try {
            const response = await axios.put(`${SERVER_URL}/recipes/${userId}/${recipe.id}`, { ...recipe });
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * @function saveRecipe
 * @description saves a recipe
 * @param {object} recipe - recipe payload to be saved
 * @returns { promise } -Axios http response from the server
 */
export const saveRecipe = createAsyncThunk(
    'recipes/saveRecipeStatus',
    async ({ userId, id }) => {
        try {
            const response = await axios.post(`${SERVER_URL}/recipes/save/${userId}/${id}`, {});
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * @function unsaveRecipe
 * @description deletes a saved recipe
 * @param {object} recipe - recipe payload to be saved
 * @returns { promise } -Axios http response from the server
 */
export const unsaveRecipe = createAsyncThunk(
    'recipes/unsaveRecipeStatus',
    async ({ userId, id }) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/recipes/unsave/${userId}/${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);
