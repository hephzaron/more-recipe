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

/**
 * uploadRecipePhoto
 * @description uploads image file to cloudinary
 * @param {object} photoFile - Picture file to be uploaded
 * @returns { promise } -Axios http response from cloudinary
 */
export const uploadRecipePhoto = ({ photoFile }) => {
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

        formData.append('file', photoFile);
        formData.append('signature', signature);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp);
        formData.append('eager', 'c_crop,w_400,h_400,g_face|w_200,h_200,c_scale');
        formData.append('folder', 'signed_recipe_upload');

        let Axios = axios.create();
        delete Axios.defaults.headers.common['X-Access-Token'];

        return Axios.post(cloudinaryUrl, formData)
        .then((response) => response.data)
        .catch((error) => Promise.reject(error));
    })
    .catch((error) => Promise.reject(error));
};

export const addRecipe = (recipe) => (
    async dispatch => {
        try {
            const data = await uploadRecipePhoto({
                photoFile: recipe.photoUrl
            });
            console.log('pic_url', data);
            const response = await axios.post(`${SERVER_URL}/recipes`, {
                ...recipe, photoUrl: data['secure_url']
            });
            console.log('data_r', response.data);

            dispatch(createRecipeSuccess(response.data.recipe));
            return Promise(data);
        } catch (error) {
            console.log('general', error);
            /** handle error response sent from App server and cloudinary */
            if (error.response && error.response.status > 201) {
                /** Return error response on failed request to cloudinary*/
                if (error.response.data.error) {
                    dispatch(createRecipeFailure(error.response.data.error['message']));
                    return Promise.reject(error.response.data.error);
                } else {
                    dispatch(createRecipeFailure(error.response.data['message']));
                    return Promise.reject(error.response.data);
                }
            }
            /** Error handler for network error */
            dispatch(createRecipeFailure(error.response.data['message']));
            return Promise.reject(error);
        }
    });
