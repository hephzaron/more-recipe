import types from '../actions/actionTypes';
import { initialRecipeState } from './initialState';

const {
    FETCH_RECIPES_BEGIN,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAILURE,
    EDIT_RECIPE_SUCCESS,
    EDIT_RECIPE_FAILURE
} = types;

const recipeReducer = (state = initialRecipeState, action = {}) => {
    switch (action.type) {
        case FETCH_RECIPES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                recipes: action.payload.recipes,
                error: null
            };
        case FETCH_RECIPES_FAILURE:
            return {
                ...state,
                loading: false,
                recipes: [],
                error: action.payload.error
            };
        case CREATE_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipe: action.payload.recipe,
                error: null
            };
        case CREATE_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                recipe: {},
                error: action.payload.error
            };
        case EDIT_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                recipe: action.payload.recipe,
                error: null
            };
        case EDIT_RECIPE_FAILURE:
            return {
                ...state,
                loading: false,
                recipe: {},
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default recipeReducer;
