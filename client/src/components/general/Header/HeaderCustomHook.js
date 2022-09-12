import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { fetchRecipes, fetchSavedRecipes, fetchMyRecipes } from '../../../actions/recipeActions';

/**
 * @function useHeader
 * @description A custom hook that handles header function component
 * @param { function } logoutUser - dipatches action creators that logs out a user
 * @param { function } showModal - dispatches action creators that displays the modal component
 * @returns { object } values - values from input change event handler
 * @returns { function } logOut
 * @returns { function } toggleNav
 * @returns { function } displayModal
 * @returns { function } toggleProfileList
 * @returns { function } inputChangeHandler
 */
const useHeader = ({ logoutUser, showModal }) => {
    const [values, setValues] = useState({ });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state) => state.userAuthReducer.isAuthenticated);
    const user = useSelector((state) => state.userAuthReducer.user);
    const flashMessageType = useSelector((state) => state.flashMessageReducer.type);

    const toggleProfileList = () => {
        const profileDropdown = document.getElementById('profile-dropdown');
        profileDropdown.style.display = profileDropdown.style.display === "block" ? "" : "block";
    };

    const toggleNav = () => {
        const topNav = document.getElementById('topnav');
        topNav.style.display = topNav.style.display === "block" ? "" : "block";
    };

    const inputChangeHandler = (event) => {
        setValues({ [event.target.name]: event.target.value });
    };

    const submitSearchForm = (event) => ({});

    const displayModal = () => {
        dispatch(showModal());
        toggleNav();
    };

    const getAllRecipes = () => {
        dispatch(fetchRecipes())
        .then(() => navigate('/'));
    };

    const getSavedRecipes = () => {
        dispatch(fetchSavedRecipes({ userId: user.id })).unwrap()
        .then(() => navigate('saved-recipes'))
        .catch((error) => {
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }));
            getAllRecipes();
        });
    };

    const getMyRecipes = () => {
        dispatch(fetchMyRecipes(user.id)).unwrap()
        .then(() => navigate('my-recipes'))
        .catch((error) => {
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }));
            getAllRecipes();
        });
    };

    const logOut = () => {
        dispatch(logoutUser())
        .then(() => getAllRecipes());
    };

    return {
        values,
        isAuthenticated,
        user,
        flashMessageType,
        logOut,
        toggleNav,
        displayModal,
        toggleProfileList,
        inputChangeHandler,
        submitSearchForm,
        getAllRecipes,
        getSavedRecipes,
        getMyRecipes
    };
};

export default useHeader;
