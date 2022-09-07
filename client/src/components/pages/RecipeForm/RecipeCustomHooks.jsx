import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateRecipeForm } from '../../../utils/validators/recipe';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { hideModal } from '../../../actions/modalActions';
import { fetchRecipes } from '../../../actions/recipeActions';
import { uploadPhoto, deletePhotoByToken } from '../../../actions/uploadActions';

/**
 * @function useRecipeForm
 * @description A custom hook to handle recipe form inputs and submission
 * @param {function} callback
 * @returns  { object } { inputs, submitRecipeForm, handleInputChange }
 */
const useRecipeForm = (callback) => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState({});

    const [formErrors, setFormErrors] = useState({
        name: '',
        photoUrl: ''
    });

    const userId = useSelector((state) => state.userAuthReducer.user.id);
    const deleteToken = useSelector((state) => state.photoReducer.deleteToken);

    const dispatch = useDispatch();

    /**
     * @function submitRecipeForm
     * @description Handles recipe form submission
     * @param {object} event
     * @returns { null } void
     */
    const submitRecipeForm = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { name, description } = recipe;
        const { photoUrl } = imageFile;
        const { validationErrors, isValid } = validateRecipeForm({ name, description, photoUrl });
        setFormErrors({ ...formErrors, ...validationErrors });

        if (isValid) {
            dispatch(uploadPhoto({ photoFile: photoUrl })).unwrap()
            .then((data) => {
                dispatch(callback({
                    userId, name, description, photoUrl: data['secured_url']
                })).unwrap()
                .then((response) => {
                    dispatch(addFlashMessage({
                        message: response.message,
                        type: 'success'
                    }));
                    dispatch(hideModal());
                    return dispatch(fetchRecipes());
                });
            })
            .catch((error) => {
                if (deleteToken) {
                    dispatch(deletePhotoByToken({ deleteToken }));
                }
                dispatch(hideModal());
                dispatch(addFlashMessage({
                    message: error.message,
                    type: 'failure'
                }));
            })
            setFormErrors({});
        }
    };

    /**
     * @function handleInputChange
     * @description Handles recipe form input change
     * @param {object} event
     * @returns { null } void
     */
    const handleInputChange = (event) => {
        event.persist();
        if (event.target.name !== 'photoUrl') {
            setRecipe(prevRecipe => ({
                ...prevRecipe, [event.target.name]: [event.target.value]
            }));
        } else {
            setImageFile(prevImageFile => ({
                ...prevImageFile, [event.target.name]: event.target.files[0]
            }));
        }
    };

    return {
        recipe,
        formErrors,
        submitRecipeForm,
        handleInputChange
    };
};


export default useRecipeForm;
