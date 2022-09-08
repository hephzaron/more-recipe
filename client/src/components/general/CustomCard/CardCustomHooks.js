import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import {
    updateRecipe, saveRecipe, unsaveRecipe, fetchRecipes
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
            dispatch(updateRecipe({ userId, recipe: { id, downVotes: 1 } }));
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
        dispatch(saveRecipe({ userId, id })).unwrap()
        .then(() => {
            dispatch(updateRecipe({ userId, recipe: { id, upVotes: 1 } }));
            return dispatch(addFlashMessage({
                message: 'Recipe saved successfully',
                type: 'success'
            }));
        })
        .catch((error) => {
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

    return {
        reactToPost,
        savePost
    };
};

export default useCard;
