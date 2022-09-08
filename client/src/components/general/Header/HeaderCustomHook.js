import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

    const logOut = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    const displayModal = () => {
        dispatch(showModal());
        toggleNav();
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
        submitSearchForm
    };
};

export default useHeader;
