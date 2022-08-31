import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @function usePagination
 * @description A custom hook that handles pagination function components
 * @param { function } fetchRecipes - dipatches action creators that fetch recipes
 * @param { function } setPage - dispatches action creators that sets the page
 * @param { function } setFetchedPages - dispatches action creators that set an array of active pages
 * @returns { array } recipePages
 * @returns { function } setSelectedPage
 */
const usePagination = ({ fetchRecipes, setPage, setFetchedPages }) => {
    const [activePages, setActivePages] = useState({
        activePages: []
    });

    const recipes = useSelector((state) => state.recipeReducer.recipes);
    const recipePages = useSelector((state) => state.paginationReducer.recipePages);
    const currentPage = useSelector((state) => state.paginationReducer.currentPage);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFetchedPages(recipes, recipePages['0'], 8));
        setActivePages({ activePages: recipePages });
    }, []);

    useEffect(() => {
        if ((currentPage === activePages['4'] + 1) ||
            (currentPage === activePages['0'] - 1 && currentPage > 0)) {
                dispatch(setFetchedPages(recipes, currentPage, 8));
                setActivePages({ activePages: recipePages });
            }
    }, [activePages]);

    /**
     * Brings up the selected page to the view of the user
     * @method setSelectedPage
     * @memberof Pagination
     * @param {integer} pageNumber
     * @returns { null }  void
     */
    const setSelectedPage = (pageNumber) => {
        if (Object.keys(recipePages).length === 5 &&
            recipePages['4'] === currentPage &&
            pageNumber > recipePages['4']) {
            dispatch(fetchRecipes(Object.keys(recipePages).length * 8));
        }
        dispatch(setPage(pageNumber));
    };

    return {
        recipePages,
        currentPage,
        setSelectedPage
    };
};

export default usePagination;
