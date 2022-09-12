import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateUserForm } from '../../../utils/validators/user';
import { logoutUser } from '../../../actions/authUserActions';
import { addFlashMessage } from "../../../actions/flashMessageActions";

/**
 * @function useChangePasswordForm
 * @description A custom hook to handle user change of password
 * @param {function} changePassword - dispatch action creators to change a user a password
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitAuthForm }
 */
const useChangePasswordForm = (changePassword) => {
    const [userInput, setUserInput] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.userAuthReducer.user.id);

    /**
     * Submit completed ChangePasswordForm
     * @memberof LoginForm
     * @param {object} event
     * @returns {null} void
     */
    const submitAuthForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors } = validateUserForm(userInput);
        const { oldPassword, newPassword, confirmPassword } = validationErrors;
        const isValid = !(oldPassword || newPassword || confirmPassword);
        setFormErrors({
            ...formErrors, oldPassword, newPassword, confirmPassword
        });

        if (isValid) {
            dispatch(loginUser(userInput)).unwrap()
            .then((response) => {
                const { user } = response;
                dispatch(addFlashMessage({
                    message: response.message,
                    type: 'success'
                }));
                dispatch(logoutUser()).then(() => navigate('/login'));
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
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };
    return {
        userInput,
        formErrors,
        inputChangeHandler,
        submitAuthForm
    };
};

export default useChangePasswordForm;
