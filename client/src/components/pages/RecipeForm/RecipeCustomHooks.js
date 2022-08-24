import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateRecipeForm } from '../../../utils/validators/recipe';

/**
 * @function useRecipeForm
 * @description A custom hook to handle recipe form inputs and submission
 * @param {function} callback
 * @returns  { object } { inputs, submitRecipeForm, handleInputChange }
 */
const useRecipeForm = (callback) => {
    const [recipe, setRecipe] = useState({
        name: '',
        description: '',
        photoUrl: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        photoUrl: ''
    });

    const flashMessageType = useSelector((state) => state.flashMessageReducer.type);

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
        const { validationErrors, isValid } = validateRecipeForm(recipe);
        setFormErrors({ ...formErrors, ...validationErrors });

        if (isValid) {
            callback(recipe);
            setRecipe({});
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
        setRecipe({ ...recipe, [event.target.name]: [event.target.value] });
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
