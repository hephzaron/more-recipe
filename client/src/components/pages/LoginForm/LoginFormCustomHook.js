import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateUserForm } from "../../../utils/validators/user";

/**
 * @function useLoginForm
 * @description A custom hook to handle user login
 * @param {function} loginUser - dispatch action creator to login user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitAuthForm }
 */
const useLoginForm = ({ loginUser, addFlashMessage, set }) => {
    const [userInput, setUserInput] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Submit completed UserForm
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
        setFormErrors(prevErrors => ({ ...prevErrors, email, password }));

        if (isValid) {
            dispatch(loginUser(userInput)).unwrap()
            .then((response) => {
                const { user } = response;
                dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                }));
                dispatch(set({ user }));
                navigate('/');
            })
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
        const { name, value } = event.target;
        setUserInput(prevState => ({ ...prevState, [name]: value }));
    };

    return {
        userInput,
        formErrors,
        inputChangeHandler,
        submitAuthForm
    };
};

export default useLoginForm;
