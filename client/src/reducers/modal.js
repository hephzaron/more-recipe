import { createReducer } from '@reduxjs/toolkit';
import { initialModalState } from './initialState';
import { showModal, hideModal } from '../actions/modalActions';

const modalReducer = createReducer(initialModalState, (builder) => {
    builder.addCase(showModal, (state) => ({
        ...state,
        show: true
    }));
    builder.addCase(hideModal, (state) => ({
        ...state,
        show: false
    }));
});

export default modalReducer;
