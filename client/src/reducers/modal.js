import { createReducer } from '@reduxjs/toolkit';
import { initialModalState } from './initialState';
import { showModal, hideModal } from '../actions/modalActions';

const modalReducer = createReducer(initialModalState, (builder) => {
    builder.addCase(showModal, (state, action) => ({
        ...state,
        show: true,
        form: action.payload.form
    }));
    builder.addCase(hideModal, (state) => ({
        ...state,
        show: false,
        form: ''
    }));
});

export default modalReducer;
