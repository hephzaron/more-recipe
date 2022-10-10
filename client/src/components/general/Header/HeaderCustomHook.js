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
    const notifications = useSelector((state) => state.notificationReducer.notifications);

    const isAvailable = notifications ? notifications.length > 0 : false;

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

    const showNotifications = () => {
        toggleNav();
        navigate('notifications');
    };

    const showUserForm = () => {
        toggleNav();
        navigate('edit-profile');
    };

    const getAllRecipes = () => {
        dispatch(fetchRecipes())
        .then(() => {
            toggleNav();
            navigate('/');
        });
    };

    const getSavedRecipes = () => {
        dispatch(fetchSavedRecipes({ userId: user.id })).unwrap()
        .then(() => {
            navigate('saved-recipes');
            toggleNav();
        })
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
        .then(() => {
            navigate('my-recipes');
            toggleNav();
        })
        .catch((error) => {
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }));
            getAllRecipes();
        });
    };

    const logOut = () => {
        dispatch(logoutUser());
        getAllRecipes();
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
        socket.on('event:notifyContributors', (data) => {
            if (data) {
                dispatch(setNotifications(data));
            }
        });
        socket.on('event:error', (error) => {
        });
        return (() => document.removeEventListener("mousedown", handleClickOutside));
    }, []);

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
        showNotifications,
        toggleProfileList,
        inputChangeHandler,
        submitSearchForm,
        getAllRecipes,
        getSavedRecipes,
        getMyRecipes,
        showUserForm
    };
};

export default useHeader;
