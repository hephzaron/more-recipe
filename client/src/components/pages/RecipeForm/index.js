import React from 'react';
import useRecipeForm from './RecipeCustomHooks';
import FlashMessage from '../../general/FlashMessage';
import { addRecipe } from '../../../actions/recipeActions';


const RecipeForm = () => {
    const {
        recipe,
        formErrors,
        flashMessageType,
        submitRecipeForm,
        handleInputChange
    } = useRecipeForm(addRecipe);

    return (
        <div className="user-recipe-form">
            <form onSubmit={submitRecipeForm}>
                { flashMessageType && <FlashMessage/> }
                <h3>Create Recipe</h3>
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

export default RecipeForm;
