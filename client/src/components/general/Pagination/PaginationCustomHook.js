import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessageActions';

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
    const previousActivePages = useRef({ activePages: [] });

    const recipes = useSelector((state) => state.recipeReducer.recipes);
    const recipePages = useSelector((state) => state.paginationReducer.recipePages);
    const currentPage = useSelector((state) => state.paginationReducer.currentPage);

    const dispatch = useDispatch();

    /**
     * useEffect hook to run on initial render
     */
    useEffect(() => {
        setActivePages({ activePages: recipePages });
    }, []);

    /**
     * useEffect hook to run the activePages change
     */
    useEffect(() => {
        if ((currentPage === previousActivePages['4'] + 1) ||
            (currentPage === previousActivePages['0'] - 1 && currentPage > 0)) {
                dispatch(setFetchedPages(recipes, currentPage, 8));
                setActivePages({ activePages: recipePages });
            }
        previousActivePages.current = activePages;
    }, [activePages]);

    /**
     * Brings up the selected page to the view of the user
     * @method setSelectedPage
     * @memberof Pagination
     * @param {integer} pageNumber
     * @returns { null }  void
     */
    const setSelectedPage = (pageNumber) => {
        if (pageNumber && !Object.values(recipePages).includes(pageNumber)) {
            if (Object.keys(recipePages).length === 5 && pageNumber > recipePages['4']) {
	            return dispatch(fetchRecipes((recipePages['4'] * 8) + 1))
	            .then((next) => {
	                dispatch(setFetchedPages(next.recipes, recipePages['4'] + 1, 8));
	                dispatch(setPage(pageNumber));
	                return next.recipes;
	            })
	            .catch((nextError) => dispatch(addFlashMessage({
	                message: nextError.message,
	                type: 'failure'
	            })));
	        } else if (pageNumber < recipePages['0'] && recipePages['0'] >= 6) {
	            return dispatch(fetchRecipes((recipePages['0'] - 6) * 8))
	            .then((prev) => {
	                dispatch(setFetchedPages(prev.recipes, recipePages['0'] - 5, 8));
	                dispatch(setPage(pageNumber));
	                return prev.recipes;
	            })
	            .catch((prevError) => dispatch(addFlashMessage({
	                message: prevError.message,
	                type: 'failure'
	            })));
	        }
        }
        return dispatch(setPage(pageNumber));
    };

    return {
        recipePages,
        currentPage,
        setSelectedPage
    };
};

export default usePagination;
