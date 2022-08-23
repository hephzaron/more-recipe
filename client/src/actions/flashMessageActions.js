import types from './actionTypes';

const { SET_FLASH_MESSAGE, UNSET_FLASH_MESSAGE } = types;

export const setFlashMessage = ({ message, type }) => ({
    type: SET_FLASH_MESSAGE,
    payload: { message, type }
});

export const unsetFlashMessage = () => ({
    type: UNSET_FLASH_MESSAGE,
    payload: { message: '', type: '' }
});

/**
 * @description Action creator to add flash messages
 * @param { string } message
 * @param { string } type
 * @returns { null } void
 */
export const addFlashMessage = ({ message, type }) => (
    dispatch => {
        dispatch(setFlashMessage({ message, type }));
    }
);

/**
 * @description Action creator to remove flash messages
 * @param { null } void
 * @returns { null } void
 */
export const removeFlashMessage = () => (
    dispatch => {
        dispatch(unsetFlashMessage());
    }
);
