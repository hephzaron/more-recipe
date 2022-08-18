import types from '../actions/actionTypes';
import { initialRecipeState } from './initialState';

const {
    FETCH_RECIPES_BEGIN,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE
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
        default:
            return state;
    }
};

export default recipeReducer;
