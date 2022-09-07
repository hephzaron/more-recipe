import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loginUser, unset, set } from '../actions/authUserActions';
import { initialUserState } from './initialState';

const userAuthReducer = createReducer(initialUserState, (builder) => {
    builder.addCase(set, (state, action) => ({
        ...state,
        user: action.payload.user,
        error: '',
        isAuthenticated: !_.isEmpty(action.payload.user)
    }));
    builder.addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.user
    }));
    builder.addCase(loginUser.rejected, (state, action) => ({
        ...state,
        user: {},
        error: action.payload['message'],
        isAuthenticated: false
    }));
    builder.addCase(unset, (state) => ({
        ...state,
        user: {},
        isAuthenticated: false,
        error: null
    }));
});

export default userAuthReducer;
