import axios from 'axios';
import dotEnv from 'dotenv';
import { scale } from "@cloudinary/url-gen/actions/resize";
import types from './actionTypes';
import { cloudinary } from '../../config/cloudinary';

dotEnv.config();

const { SERVER_URL, CLOUDINARY_API_KEY, CLOUDINARY_UPLOAD_URL } = process.env;

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

export const addRecipe = (recipe) => (
    dispatch => {
        const {
            userId, name, description, photoUrl
        } = recipe;
        return axios.post(`${SERVER_URL}/recipes`, {
            userId, name, description, photoUrl
        })
        .then((response) => {
            dispatch(createRecipeSuccess(response.data.recipe));
            return response.data;
        })
        .catch((error) => {
            dispatch(createRecipeFailure(error.response.data['message']));
            if (error.response.status > 201) {
                return Promise.reject(error.response.data);
            }
            return error.response.data;
        });
    }
);

export const uploadRecipePhoto = ({ photoUrl, userId, name }) => {
    const file = photoUrl;
    const uploadUrl = CLOUDINARY_UPLOAD_URL;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append("eager", "h_163,w_200|c_crop,h_200,w_260");
    formData.append("folder", "signed_upload_recipe_form");

    const recipeImage = cloudinary.image(`${name}-${userId}`);
    recipeImage.resize(scale().width(200).height(163)).format('png');
    return recipeImage.toURL();
};


/**
export const uploadImage = ({ photoUrl, userId, name }) => (
    cloudinary.uploader.upload(photoUrl, {
      tags: 'more_recipe',
      public_id: `${name}-${userId}`,
      width: 200,
      height: 163,
      crop: 'fill'
    }, (error, result) => {
      if (error) {
        console.log('error', error);
      }
      console.log('result', result);
    }));

    */
