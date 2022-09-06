import { createAction } from "@reduxjs/toolkit";

export const set = createAction('flashMesssage/set');
export const unset = createAction('flashMessage/unset');

/**
 * @description Action creator to add flash messages
 * @param { string } message
 * @param { string } type
 * @returns { null } void
 */
export const addFlashMessage = ({ message, type }) => (
    dispatch => {
        dispatch(set({ message, type }));
    }
);

/**
 * @description Action creator to remove flash messages
 * @param { null } void
 * @returns { null } void
 */
export const removeFlashMessage = () => (
    dispatch => {
        dispatch(unset());
    }
);
