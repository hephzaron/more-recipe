import { createAction } from '@reduxjs/toolkit';

/**
 * Set current page
 * @description Sets fetched recipes to the store
 * @param { string } currentPage - Payload of fetched recipes
 * @returns { object } Set pager action creator
 */
export const setCurrentPage = createAction(
    'page/setCurrentPage', (currentPage) => ({ payload: { currentPage } })
    );


/**
 * Set recipe pages
 * @description Sets fetched recipes to the store
 * @param { string } recipePages - Payload of fetched recipes
 * @returns { object } Set pager action creator
 */
export const setRecipesPages = createAction(
    'page/setRecipesPages', (recipePages) => ({ payload: { recipePages } })
    );

/**
 * Set fetched pages
 * @description Sets pages of fetched recipes
 * @param { array } recipes - Recipes fetched
 * @param { integer } beginAt - Number to start recipe numbering from
 * @param { ineteger }  recipesPerPage - Number of recipes per page
 * @returns { object } fetchedPages - Key-Value pairs of pages
 */
export const setFetchedPages = (recipes, beginAt = 1, recipesPerPage = 8) => (
    dispatch => {
        const numberOfFetchedPages = Math.ceil(recipes.length / recipesPerPage);
        const fetchedPages = Object.assign({}, [...Array(numberOfFetchedPages).keys()].map(i => i + beginAt));
        dispatch(setRecipesPages(fetchedPages));
        return fetchedPages;
    }
);

export const setPage = (pageNumber) => (
    dispatch => {
        if (pageNumber > 0) {
            return dispatch(setCurrentPage(pageNumber));
        }
    }
);
