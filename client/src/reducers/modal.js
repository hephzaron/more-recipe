import types from '../actions/actionTypes';
import { initialModalState } from './initialState';

const { SHOW_MODAL, HIDE_MODAL } = types;

const modalReducer = (state = initialModalState, action = {}) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                show: true
            };
        case HIDE_MODAL:
            return {
                ...state,
                show: false
            };
        default:
            return state;
    }
};

export default modalReducer;
