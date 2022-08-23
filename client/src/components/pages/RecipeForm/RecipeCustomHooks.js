import React, { useState } from 'react';
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
        submitRecipeForm,
        handleInputChange
    };
};


export default useRecipeForm;
