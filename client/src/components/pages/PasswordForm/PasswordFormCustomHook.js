import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateUserForm } from "../../../utils/validators/user";
import { addFlashMessage } from "../../../actions/flashMessageActions";
import { createNewPassword } from "../../../actions/passwordActions";

const usePasswordForm = () => {
    const [userInput, setUserInput] = useState({ email: '', password: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = searchParams.get('token');

    /**
     * Handles input changes in field entries
     * @function inputChangeHandler
     * @memberof useResetForm
     * @param {object} event
     * @returns {null} void
     */
    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setUserInput(prevState => ({ ...prevState, [name]: value }));
    };
    const submitPasswordForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors } = validateUserForm(userInput);
        const { email, password, confirmPassword } = validationErrors;
        const isValid = !(email || password || confirmPassword);
        setFormErrors({ email, password, confirmPassword });

        if (isValid) {
            dispatch(createNewPassword({
                token, ...userInput
            })).unwrap()
            .then((response) => {
                dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                }));
                setSearchParams('');
                navigate('/login');
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
        submitPasswordForm
    };
};

export default usePasswordForm;
