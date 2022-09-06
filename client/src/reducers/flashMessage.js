import { createReducer } from '@reduxjs/toolkit';
import { set, unset } from '../actions/flashMessageActions';
import { initialFlashMessageState } from './initialState';

const flashMessageReducer = createReducer(initialFlashMessageState, (builder) => {
    builder.addCase(set, (_, action) => ({ ...action.payload }));
    builder.addCase(unset, () => ({ message: '', type: '' }));
});

export default flashMessageReducer;
