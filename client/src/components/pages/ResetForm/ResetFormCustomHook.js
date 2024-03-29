import { useState } from "react";
import { useDispatch } from 'react-redux';
import { validateUserForm } from "../../../utils/validators/user";
import { addFlashMessage } from "../../../actions/flashMessageActions";
import { sendResetLink } from "../../../actions/passwordActions";

const useResetForm = () => {
    const [userInput, setUserInput] = useState({ email: '' });
    const [formErrors, setFormErrors] = useState({ email: '' });

    const dispatch = useDispatch();

    /**
     * Handles input changes in field entries
     * @function inputChangeHandler
     * @memberof useResetForm
     * @param {object} event
     * @returns {null} void
     */
    const inputChangeHandler = (event) => {
        event.persist();
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };
    const submitResetForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors } = validateUserForm(userInput);
        const { email } = validationErrors;
        const isValid = !email;
        setFormErrors({ email });

        if (isValid) {
            dispatch(sendResetLink(userInput)).unwrap()
            .then((response) => {
                dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                }));
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
        inputChangeHandler,
        submitResetForm
    };
};

export default useResetForm;
