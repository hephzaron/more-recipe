import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateRecipeForm } from '../../../utils/validators/recipe';
import { addFlashMessage } from '../../../actions/flashMessageActions';

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

    const flashMessageType = useSelector((state) => state.flashMessageReducer.type);

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
            dispatch(callback({ name, description, photoUrl }))
            .then((response) => dispatch(addFlashMessage({
                message: response.message,
                type: 'success'
            })))
            .catch((error) => {
                return dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }))});
            setRecipe({});
            setImageFile({});
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
            setRecipe({ ...recipe, [event.target.name]: [event.target.value] });
        } else {
            setImageFile({ ...imageFile, [event.target.name]: event.target.files[0] });
            console.log('file', event.target.files[0]);
        }
    };

    return {
        recipe,
        formErrors,
        flashMessageType,
        submitRecipeForm,
        handleInputChange
    };
};


export default useRecipeForm;
