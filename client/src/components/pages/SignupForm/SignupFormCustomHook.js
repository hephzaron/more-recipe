import { useState } from "react";
import { useDispatch } from 'react-redux';
import { validateUserForm } from "../../../utils/validators/user";

/**
 * @function useSignupForm
 * @description A custom hook to handle user registration
 * @param {function} registerUser - dispatch action creator to register a user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitUserForm }
 */
const useSignupForm = ({ addFlashMessage, registerUser }) => {
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
        setUserInput({ ...userInput, [name]: value });
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
            dispatch(registerUser({ ...userInput, age: parseInt(userInput.age, 10) }))
                .then((response) => dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                })))
                .catch((error) => dispatch(addFlashMessage({
                    message: error.message,
                    type: 'failure'
                })));
        }
    };

    return {
        userInput,
        formErrors,
        inputChangeHandler,
        submitUserForm
    };
};

export default useSignupForm;