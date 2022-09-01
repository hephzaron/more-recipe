import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @function useHomePage
 * @description A custom hook that handles homepage function components
 * @param { function } fetchRecipes - dipatches action creators that fetch recipes
 * @param { function } hideModal - dispatches action creators that hides the Modal component
 * @returns { object } [activeRecipes, showRecipeModal, isAuthenticated, loading, error, wrapperRef, closeForm]
 */
const useHomePage = ({ fetchRecipes, hideModal }) => {
    const [currentRecipes, setCurrentRecipes] = useState([]);
    const dispatch = useDispatch();

    const recipes = useSelector((state) => state.recipeReducer.recipes || []);
    const loading = useSelector((state) => state.recipeReducer.loading);
    const error = useSelector((state) => state.recipeReducer.error);
    const currentPage = useSelector((state) => state.paginationReducer.currentPage);
    const showRecipeModal = useSelector((state) => state.modalReducer.show);
    const isAuthenticated = useSelector((state) => state.userAuthReducer.isAuthenticated);

    const wrapperRef = useRef();
    const previousPage = useRef({ currentPage: [] });

    /**
     * Handles outside click event of modal on homepage
     * @function handleClickOutside
     * @param {object} event
     * @returns { null }  void
     */
    const handleClickOutside = (event) => {
        if (!wrapperRef.current) {
            return null;
        }
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            dispatch(hideModal());
        }
    };

    /**
     * Handles click on modal close icon to remove it
     * @function closeForm
     * @param {object} event
     * @returns { null }  void
     */
    const closeForm = (event) => {
        dispatch(hideModal());
    };

    /** React hook runs once when component mounts */
    useEffect(() => {
        dispatch(fetchRecipes());
        document.addEventListener("mousedown", handleClickOutside);
        return (() => document.removeEventListener("mousedown", handleClickOutside));
    }, []);

    /** React hook runs when the current page gets updated*/
    useEffect(() => {
        if (currentPage !== previousPage) {
            const end = (currentPage * 8);
            const start = end - 8;
            setCurrentRecipes(recipes.slice(start, end));
        }
        previousPage.current = currentPage;
    }, [currentPage]);

    /**Display only requested recipes per page */
    const activeRecipes = currentRecipes.length === 0 ? recipes.slice(0, 8) : currentRecipes;

    return {
        activeRecipes,
        showRecipeModal,
        isAuthenticated,
        loading,
        error,
        wrapperRef,
        closeForm
    };
};

export default useHomePage;
