import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validateUserForm } from '../../../utils/validators/user';
import { logoutUser } from '../../../actions/authUserActions';
import { hideModal } from '../../../actions/modalActions';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { changePassword } from '../../../actions/passwordActions';

/**
 * @function useChangePasswordForm
 * @description A custom hook to handle user change of password
 * @param {function} changePassword - dispatch action creators to change a user a password
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitAuthForm }
 */
const useChangePasswordForm = () => {
    const [userInput, setUserInput] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [formErrors, setFormErrors] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.userAuthReducer.user.id);

    /**
     * Submit completed ChangePasswordForm
     * @memberof useChangePasswordForm
     * @param {object} event
     * @returns {null} void
     */
    const submitChangePasswordForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { validationErrors } = validateUserForm(userInput, 'changePassword');
        const { oldPassword, newPassword, confirmPassword } = validationErrors;
        const isValid = !(oldPassword || newPassword || confirmPassword);
        setFormErrors({
            ...formErrors, oldPassword, newPassword, confirmPassword
        });

        if (isValid) {
            dispatch(changePassword({ userId, ...userInput })).unwrap()
            .then((response) => {
                const { message } = response;
                dispatch(addFlashMessage({
                    message: message,
                    type: 'success'
                }));
                dispatch(hideModal({}));
                dispatch(logoutUser());
                navigate('/login');
            })
            .catch((error) => dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            })));
        }
    };

    /**
     * Handles input changes in field entries
     * @function handleInputChange
     * @memberof useChangePasswordForm
     * @param {object} event
     * @returns {null} void
     */
    const handleInputChange = (event) => {
        event.persist();
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };
    return {
        userInput,
        formErrors,
        handleInputChange,
        submitChangePasswordForm
    };
};

export default useChangePasswordForm;
