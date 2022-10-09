import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateUserForm } from "../../../utils/validators/user";

/**
 * @function useSignupForm
 * @description A custom hook to handle user registration
 * @param {function} registerUser - dispatch action creator to register a user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitUserForm }
 */
const useSignupForm = ({
    addFlashMessage, registerUser, loginUser, set
}) => {
    const [userInput, setUserInput] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        password: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    /**
     * Handles input changes in field entries
     * @function inputChangeHandler
     * @memberof usSignupForm
     * @param {object} event
     * @returns {null} void
     */
    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setUserInput(prevState => ({ ...prevState, [name]: value }));
    };

    /**
     * Submit completed SignupForm
     * @function submitUserForm
     * @memberof SignupForm
     * @param {object} event
     * @returns {null} void
     */
    const submitUserForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors, isValid } = validateUserForm(userInput);
        setFormErrors({ ...validationErrors });

        if (isValid) {
            dispatch(registerUser({ ...userInput, age: parseInt(userInput.age, 10) })).unwrap()
                .then((response) => {
                    const { email, password } = userInput;
                    const { user } = response.userPayload;
                    dispatch(addFlashMessage({
                        message: response.message,
                        type: 'success'
                    }));
                    dispatch(loginUser({ email, password }));
                    dispatch(set({ user }));
                    navigate('/');
                })
                .catch((error) => dispatch(addFlashMessage({
                    message: error.message,
                    type: 'failure'
                })));
        }
    };

    return {
        userInput,
        formErrors,
        pathname,
        inputChangeHandler,
        submitUserForm
    };
};

export default useSignupForm;
