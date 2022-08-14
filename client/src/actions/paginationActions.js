import types from './actionTypes';

const {
    SET_CURRENT_PAGE,
    SET_RECIPES_PAGES
} = types;

/**
 * Set current page
 * @description Sets fetched recipes to the store
 * @param { string } currentPage - Payload of fetched recipes
 * @returns { object } Set pager action creator
 */
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    payload: { currentPage }
});

/**
 * Set recipe pages
 * @description Sets fetched recipes to the store
 * @param { string } recipePages - Payload of fetched recipes
 * @returns { object } Set pager action creator
 */
export const setRecipesPages = (recipePages) => ({
    type: SET_RECIPES_PAGES,
    payload: { recipePages }
});

export const setFetchedPages = (recipes, beginAt = 1, recipesPerPage = 8) => (
    dispatch => {
        const numberOfFetchedPages = Math.ceil(recipes.length / recipesPerPage);
        const fetchedPages = [...Array(numberOfFetchedPages).keys()].map(i => i + beginAt);
        dispatch(setRecipesPages(fetchedPages));
        return fetchedPages;
    }
);

export const setPage = (pageNumber) => (
    dispatch => {
        dispatch(setCurrentPage(pageNumber));
    }
);
