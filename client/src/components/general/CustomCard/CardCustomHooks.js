import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import {
    updateRecipe, saveRecipe, unsaveRecipe, fetchRecipes
} from '../../../actions/recipeActions';

const useCard = (recipe) => {
    const dispatch = useDispatch();
    const [save, setSave] = useState(false);
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

    const savePost = () => {
        dispatch(saveRecipe({ userId, id }));
        return dispatch(updateRecipe({ userId, id, upVotes: 1 })).unwrap()
        .then((response) => {
            setSave(true);
            return dispatch(addFlashMessage({
                message: response.message,
                type: 'success'
            }));
        })
        .catch((error) => {
            let { message } = error;
            if (error.message === 'You are not allowed to vote your own recipe') {
                message = 'You are not allowed to save your own recipe';
            }
            return dispatch(addFlashMessage({
                message,
                type: 'failure'
            }));
        });
    };

    const unsavePost = () => {
        dispatch(unsaveRecipe({ userId, id }));
        return dispatch(updateRecipe({ userId, id, downVotes: 1 })).unwrap()
        .then((response) => {
            setSave(false);
            return dispatch(addFlashMessage({
                message: response.message,
                type: 'success'
            }));
        })
        .catch((error) => (
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }))
        ));
    };

    const toggleSave = () => {
        if (save) {
            unsavePost();
        }
        savePost();
    };

    return {
        reactToPost,
        toggleSave
    };
};

export default useCard;
