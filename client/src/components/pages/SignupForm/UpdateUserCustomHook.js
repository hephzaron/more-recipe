import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser, fetchOneUser } from '../../../actions/userActions';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { uploadPhoto, deletePhotoByToken } from "../../../actions/uploadActions";
import { validateUserForm } from '../../../utils/validators/user';

/**
 * @function useUserUpdateForm
 * @description A custom hook to handle user registration
 * @param {function} registerUser - dispatch action creator to register a user
 * @param {function} addFlashMessage - dispatch action creators to add flash message page
 * @returns  { object } { userInput, formErrors, flashMesageType, inputChangeHandler, submitUserForm }
 */
const useUserUpdateForm = () => {
    const userProfile = useSelector((state) => state.userAuthReducer.user);
    const deleteToken = useSelector((state) => state.photoReducer.deleteToken);

    const [userInput, setUserInput] = useState({
        username: userProfile.username || '',
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        age: userProfile.age || '',
    });
    const [imageFile, setImageFile] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Handles input changes in field entries
     * @function inputChangeHandler
     * @memberof useSignupForm
     * @param {object} event
     * @returns {null} void
     */
    const inputChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        if (event.target.name !== 'profilePhotoUrl') {
            setUserInput(prevState => ({ ...prevState, [name]: value }));
        } else {
            setImageFile(prevImageFile => ({
                ...prevImageFile, [event.target.name]: event.target.files[0]
            }));
        }
    };

    /**
     * Submit completed UserForm
     * @function submitUserForm
     * @memberof SignupForm
     * @param {object} event
     * @returns {null} void
     */
    const submitUserForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { profilePhotoUrl } = imageFile;
        const { validationErrors, isValid } = validateUserForm(userInput, 'update');
        setFormErrors({ ...validationErrors });

        if (isValid) {
            dispatch(uploadPhoto({ photoFile: profilePhotoUrl })).unwrap()
            .then((data) => {
                dispatch(updateUser({
                    ...userInput, id: userProfile.id, profilePhotoUrl: data['secure_url']
                })).unwrap()
                .then((response) => {
                    dispatch(fetchOneUser({ id: userProfile.id }));
                    dispatch(addFlashMessage({
                        message: response.message,
                        type: 'success'
                    }));
                    navigate('/');
                })
                .catch((error) => {
                    if (data) {
                        dispatch(deletePhotoByToken({ deleteToken: data['delete_token'] }));
                    }
                    dispatch(addFlashMessage({
                        message: error.message,
                        type: 'failure'
                    }));
                });
            })
            .catch((error) => {
                if (deleteToken) {
                    dispatch(deletePhotoByToken({ deleteToken }));
                }
                dispatch(addFlashMessage({
                    message: error.message,
                    type: 'failure'
                }));
            });
            setFormErrors({});
        }
    };

    return {
        userInput,
        formErrors,
        inputChangeHandler,
        submitUserForm
    };
};

export default useUserUpdateForm;
