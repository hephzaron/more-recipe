import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { validateUserForm } from "../../../utils/validators/user";

/**
 * @function useLoginForm
 * @description A custom hook to handle user login
 * @param {function} loginUser - dispatch action creator to login user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitAuthForm }
 */
const useLoginForm = ({ loginUser, addFlashMessage }) => {
    const [userInput, setUserInput] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const flashMessageType = useSelector((state) => state.flashMessageReducer.type);

    const dispatch = useDispatch();

    /**
     * Submit completed UserForm
     * @method submitAuthForm
     * @memberof LoginForm
     * @param {object} event
     * @returns {null} void
     */
    const submitAuthForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors } = validateUserForm(userInput);
        const { email, password } = validationErrors;
        const isValid = !(email || password);
        setFormErrors({ ...formErrors, email, password });

        if (isValid) {
            dispatch(loginUser(userInput))
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

    /**
     * Handles input changes in field entries
     * @function inputChangeHandler
     * @memberof useLoginForm
     * @param {object} event
     * @returns {null} void
     */
    const inputChangeHandler = (event) => {
        event.persist();
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };
    return {
        userInput,
        formErrors,
        flashMessageType,
        inputChangeHandler,
        submitAuthForm
    };
};

export default useLoginForm;
