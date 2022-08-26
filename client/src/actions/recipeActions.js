/* eslint-disable no-shadow */
import axios from 'axios';
import dotEnv from 'dotenv';
import types from './actionTypes';

dotEnv.config();

const { SERVER_URL } = process.env;

const {
    FETCH_RECIPES_BEGIN,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAILURE
} = types;

/**
 * Set recipes
 * @description Sets fetched recipes to the store
 * @param { array } recipes - Payload of fetched recipes
 * @returns { object } Set recipe action creator
 */
export const fetchRecipesBegin = () => ({
    type: FETCH_RECIPES_BEGIN
});

export const fetchRecipesSuccess = (recipes) => ({
    type: FETCH_RECIPES_SUCCESS,
    payload: { recipes }
});

export const fetchRecipesFailure = (error) => ({
    type: FETCH_RECIPES_FAILURE,
    payload: { error }
});

export const createRecipeSuccess = (recipe) => ({
    type: CREATE_RECIPE_SUCCESS,
    payload: { recipe }
});

export const createRecipeFailure = (error) => ({
    type: CREATE_RECIPE_FAILURE,
    payload: { error }
});

/**
 * Get recipes
 * @description Get recipes from server
 * @param {String} offset - offset query to fetch paginated items
 * @returns { promise } -Axios http response
 */
export const fetchRecipes = (offset = 0) => (
    dispatch => {
        const limit = 40;
        dispatch(fetchRecipesBegin());
        return axios.get(`${SERVER_URL}/recipes?offset=${offset}&limit=${limit}`)
        .then((response) => {
            dispatch(fetchRecipesSuccess(response.data.recipes));
            return response.data;
        })
        .catch((error) => {
            dispatch(fetchRecipesFailure());
            return error.response.data;
        });
    }
);

export const uploadRecipePhoto = ({ photoUrl, userId, name }) => {
    const file = photoUrl;
    const publicId = `${name}-${userId}`;
    const formData = new FormData();

    return axios.get(`${SERVER_URL}/upload/sign`)
    .then((response) => {
        const {
            apiKey,
            timestamp,
            signature,
            cloudName
        } = response.data;

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

        formData.append('file', file);
        formData.append('signature', signature);
        formData.append('api_key', apiKey);
        formData.append('public_id', publicId);
        formData.append('timestamp', timestamp);
        formData.append('eager', 'c_fill, h_163, w_200');
        formData.append('folder', 'signed_recipe_upload');

        return axios.post(cloudinaryUrl, formData)
        .then((response) => response)
        .catch((error) => error);
    })
    .catch((error) => Promise.reject(error));
};

export const addRecipe = (recipe) => (
    dispatch => {
        const {
            userId, name, description, photoUrl
        } = recipe;
        return uploadRecipePhoto(recipe)
        .then(() => (
            axios.post(`${SERVER_URL}/recipes`, {
                userId, name, description, photoUrl
            })
            .then((response) => {
                dispatch(createRecipeSuccess(response.data.recipe));
                return response.data;
            })
            .catch((error) => {
                dispatch(createRecipeFailure(error.response.data['message']));
                return Promise.reject(error.response.data);
            })))
        .catch((error) => {
            /** handle error response sent from App server */
            if (error.response && error.response.status > 201) {
                dispatch(createRecipeFailure(error.response.data['message']));
                return Promise.reject(error.response.data);
            }
            /** Return error response from cloudinary request */
            return Promise.reject(error);
        });
    }
);
