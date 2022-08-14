import types from '../actions/actionTypes';
import { initialPagerState } from './initialState';

const { SET_CURRENT_PAGE, SET_RECIPES_PAGES } = types;

const paginationReducer = (state = initialPagerState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            };
        case SET_RECIPES_PAGES:
            return {
                ...state,
                recipePages: action.payload.recipePages
            };
        default:
            return state;
    }
};

export default paginationReducer;
