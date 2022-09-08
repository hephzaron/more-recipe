import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import {
    updateRecipe, saveRecipe, unsaveRecipe, fetchRecipes, deleteRecipe
} from '../../../actions/recipeActions';

const useCard = (recipe) => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.userAuthReducer.user.id);
    const { id } = recipe;

    const reactToPost = (reaction) => (
        dispatch(updateRecipe({ userId, recipe: { ...reaction } })).unwrap()
        .then(() => (dispatch(fetchRecipes())))
        .catch((error) => (
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }))
        )));

    const unsavePost = () => (
        dispatch(unsaveRecipe({ userId, id })).unwrap()
        .then(() => {
            dispatch(updateRecipe({ userId, recipe: { id, downVotes: 1 } }))
            .then(() => dispatch(fetchRecipes()));
            return dispatch(addFlashMessage({
                message: 'Recipe has been successfully removed from your saved list',
                type: 'success'
            }));
        })
        .catch((error) => (
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }))
        )));

    const savePost = () => (
        dispatch(saveRecipe({ userId, id, creatorId: recipe.userId })).unwrap()
        .then((response) => {
            console.log(response);
            dispatch(updateRecipe({ userId, recipe: { id, upVotes: 1 } }))
            .then(() => dispatch(fetchRecipes()));
            return dispatch(addFlashMessage({
                message: 'Recipe saved successfully',
                type: 'success'
            }));
        })
        .catch((error) => {
            console.log(error);
            let { message } = error;
            if (message === 'Duplicate entry not allowed') {
                return unsavePost();
            }
            if (error.message === 'You are not allowed to vote your own recipe') {
                message = 'You are not allowed to save your own recipe';
            }
            return dispatch(addFlashMessage({
                message,
                type: 'failure'
            }));
        }));

    const deletePost = () => (
        dispatch(deleteRecipe({ userId, id })).unwrap()
        .then((response) => dispatch(addFlashMessage({
            message: response.message,
            type: 'success'
        })))
        .catch((error) => dispatch(addFlashMessage({
            message: error.message,
            type: 'failure'
        })))
    );

    return {
        reactToPost,
        savePost,
        deletePost
    };
};

export default useCard;
