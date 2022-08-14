import axios from 'axios';
import types from './actionTypes';

const { FETCH_RECIPES_BEGIN, FETCH_RECIPES_SUCCESS, FETCH_RECIPES_FAILURE } = types;

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
        axios.get(`http://localhost:5000/api/v1/recipes?offset=${offset}&limit=${limit}`)
        .then((response) => {
            dispatch(fetchRecipesSuccess(response.data.recipes));
            return response;
        })
        .catch((error) => {
            dispatch(fetchRecipesFailure());
            return error;
        });
    }
);
