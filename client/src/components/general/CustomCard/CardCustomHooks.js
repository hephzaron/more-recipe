import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessageActions';
import { likeRecipe } from '../../../actions/notificationActions';
import {
    updateRecipe, saveRecipe, unsaveRecipe, fetchRecipes, deleteRecipe
} from '../../../actions/recipeActions';

const useCard = (recipe) => {
    const dispatch = useDispatch();
    const [likeReaction, setLikeReaction] = useState({ id: -1, likes: 0, like: false });
    const user = useSelector((state) => state.userAuthReducer.user);
    const { id } = recipe;
    const userId = user.id;

    useEffect(() => {
        if (likeReaction.id < 0) {
            return;
        }
        dispatch(updateRecipe({ userId, recipe: { ...likeReaction } })).unwrap()
        .then(() => {
            if (likeReaction.like) {
                //userId: current user; recipientId: Id of creator; recipeId: Id of recipe
                dispatch(likeRecipe({ userId, recipientId: recipe.userId, recipeId: id }));
            }
            return dispatch(fetchRecipes());
        })
        .catch((error) => (
            dispatch(addFlashMessage({
                message: error.message,
                type: 'failure'
            }))
        ));

        return (() => {
            setLikeReaction({ id: -1, likes: 0, like: false });
        });
    }, [likeReaction]);

    const reactToPost = (reaction) => {
        setLikeReaction({ ...reaction, like: !likeReaction.like });
    };

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
        .then(() => {
            dispatch(updateRecipe({ userId, recipe: { id, upVotes: 1 } }))
            .then(() => dispatch(fetchRecipes()));
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

    const deletePost = () => (
        dispatch(deleteRecipe({ userId, id })).unwrap()
        .then((response) => {
            dispatch(fetchRecipes());
            return dispatch(addFlashMessage({
                message: response.message,
                type: 'success'
            }));
        })
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
