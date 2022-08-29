import types from './actionTypes';

const { SHOW_MODAL, HIDE_MODAL } = types;

export const showModal = (show) => ({
    type: SHOW_MODAL,
    payload: { show }
});

export const hideModal = (show) => ({
    type: HIDE_MODAL,
    payload: { show }
});
