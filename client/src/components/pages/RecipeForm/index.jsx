import React from 'react';
import PropTypes from 'prop-types';
import useRecipeForm from './RecipeCustomHooks';
import { createRecipe } from '../../../actions/recipeActions';


const RecipeForm = ({ closeRecipeModal, recipeFormRef }) => {
    const {
        recipe,
        formErrors,
        submitRecipeForm,
        handleInputChange
    } = useRecipeForm(createRecipe);

    return (
        <div ref = {recipeFormRef} className="user-recipe-form">
            <form onSubmit={submitRecipeForm}>
                <h3>Create Recipe</h3>
                <span onClick = {closeRecipeModal} className="close-btn">Close</span>
                <hr/>
                <label htmlFor="name">Recipe Name:</label>
                {
                    formErrors.name &&
                    <p className="error-text">{formErrors.name}</p>
                }
                <input
                    type="text"
                    id="name" required
                    onChange={handleInputChange}
                    name="name"
                    value={recipe.name}/>
                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    id="description" required
                    onChange={handleInputChange}
                    name="description"
                    value={recipe.description}/>
                <label htmlFor="photoUrl">Upload picture:</label>
                {
                    formErrors.photoUrl &&
                    <p className="error-text">{formErrors.photoUrl}</p>
                }
                <input
                    type="file"
                    id="photoUrl" required
                    onChange={handleInputChange}
                    value={recipe.photoUrl}
                    name="photoUrl" accept="image/*"/>
                <input type="submit" value="Create"/>
            </form>
        </div>
    );
};

RecipeForm.propTypes = {
    closeRecipeModal: PropTypes.func.isRequired,
    recipeFormRef: PropTypes.object.isRequired
};

export default RecipeForm;
