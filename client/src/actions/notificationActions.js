import { createAction } from '@reduxjs/toolkit';
import socket from '../assets/js/socket/config';

/**
 * likeRecipe
 * @description Emits notification to all concerned users when a recipe is liked
 * @param { object } recipeInfo - Info of recipe liked
 * @returns { null } void
 */
export const likeRecipe = createAction('recipe/like', (recipeInfo) => {
    const { userId, recipientId, recipeId } = recipeInfo;
    const parentId = recipeId;
    const notificationType = 'Likes';
    socket.emit('event:recipeLiked', {
        userId,
        recipientId,
        parentId,
        recipeId,
        notificationType
    });
    return {};
});

/**
 * reviewRecipe
 * @description Emits notification to all concerned users when a recipe is reviewed
 * @param { object } reviewInfo - Info of recipe liked
 * @returns { null } void
 */
export const reviewRecipe = createAction('recipe/review', (reviewInfo) => {
    const {
        userId, recipientId, parentId, recipeId
    } = reviewInfo;
    const notificationType = 'Review';
    socket.emit('event:reviewAdded', {
        userId,
        recipientId,
        parentId,
        recipeId,
        notificationType
    });
    return {};
});

/**
 * setNotifications
 * @description sets a user notifications
 * @param { object } notification - Info of recipe liked
 * @returns { null } void
 */
export const setNotifications = createAction(
    'recipe/notification',
    (notifications) => ({ payload: notifications })
    );
