import { createReducer } from '@reduxjs/toolkit';
import { updateUser } from '../actions/signupActions';
import { initialUserState } from './initialState';

const userReducer = createReducer(initialUserState, (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.user,
        error: ''
    }));
    builder.addCase(updateUser.rejected, (state, action) => ({
        ...state,
        user: {},
        error: action.error['message']
    }));
});

export default userReducer;
