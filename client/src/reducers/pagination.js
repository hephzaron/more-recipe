import { createReducer } from '@reduxjs/toolkit';
import { setCurrentPage, setRecipesPages } from '../actions/paginationActions';
import { initialPagerState } from './initialState';

const paginationReducer = createReducer(initialPagerState, (builder) => {
    builder.addCase(setCurrentPage, (state, action) => ({
        ...state,
        currentPage: action.payload.currentPage
    }));
    builder.addCase(setRecipesPages, (state, action) => ({
        ...state,
        recipePages: action.payload.recipePages
    }));
});

export default paginationReducer;
