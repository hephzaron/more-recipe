import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { fetchRecipes, fetchSavedRecipes, fetchMyRecipes } from '../../../actions/recipeActions';
import { setNotifications } from '../../../actions/notificationActions';
import socket from '../../../assets/js/socket/config';

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
    const [values, setValues] = useState({});
    const [isNew, setIsNew] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wrapperRef = useRef();

    const isAuthenticated = useSelector((state) => state.userAuthReducer.isAuthenticated);
    const user = useSelector((state) => state.userAuthReducer.user);
    const flashMessageType = useSelector((state) => state.flashMessageReducer.type);
    const notification = useSelector((state) => state.notificationReducer.notification);

    const isAvailable = notification.Notifications ? notification.Notifications.length > 0 : false;

    socket.on('event:newNotifications', (notificationData) => {
        if (notificationData.isNew) {
            setIsNew(true);
        }
    });

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

    const displayRecipeModal = () => {
        const form = 'recipeForm';
        dispatch(showModal({ form }));
        toggleNav();
    };

    const displayChangePasswordModal = () => {
        const form = 'changePasswordForm';
        dispatch(showModal({ form }));
        toggleNav();
        toggleProfileList();
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

    /**
     * Handles outside click event of dropdown on homepage
     * @function handleClickOutside
     * @param {object} event
     * @returns { null }  void
     */
    const handleClickOutside = (event) => {
        if (!wrapperRef.current) {
            return null;
        }
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            const profileDropdown = document.getElementById('profile-dropdown');
            profileDropdown.style.display = "";
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return (() => document.removeEventListener("mousedown", handleClickOutside));
    }, []);

    useEffect(() => {
        socket.on('event:notifyContributors', (data) => {
            dispatch(setNotifications(data));
        });

        socket.on('event:newNotifications', (notificationData) => {
            console.log(notificationData);
        });

        socket.on('event:error', (error) => {
            console.log(error);
        });
    });

    return {
        values,
        isAuthenticated,
        user,
        flashMessageType,
        wrapperRef,
        isNew,
        isAvailable,
        logOut,
        toggleNav,
        displayRecipeModal,
        displayChangePasswordModal,
        toggleProfileList,
        inputChangeHandler,
        submitSearchForm,
        getAllRecipes,
        getSavedRecipes,
        getMyRecipes
    };
};

export default useHeader;
