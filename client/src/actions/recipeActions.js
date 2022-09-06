/* eslint-disable no-shadow */
import axios from 'axios';
import dotEnv from 'dotenv';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadPhoto, deletePhotoByToken } from './uploadActions';

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
            Promise.reject(error.response.data);
        }
    }
);

/**Make photo credentials available in outer scope*/

let photoDeleteToken;

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
            const data = await uploadPhoto({
                photoFile: recipe.photoUrl
            });
            photoDeleteToken = data['delete_token'];
            const { userId, name, description } = recipe;
            const response = await axios.post(`${SERVER_URL}/recipes`, {
                userId,
                name: name[0],
                description: description[0],
                photoUrl: data['secure_url']
            });

            return response.data;
        } catch (error) {
            deletePhotoByToken({ deleteToken: photoDeleteToken });
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
    async (recipe) => {
        try {
            const response = axios.patch(`${SERVER_URL}/recipes/${recipe.userId}/${recipe.id}`, { ...recipe });
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);
