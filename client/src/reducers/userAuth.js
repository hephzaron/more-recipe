import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import { loginUser, unset, set } from '../actions/authUserActions';
import { fetchOneUser, updateUser } from '../actions/userActions';
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
        error: action.error['message'],
        isAuthenticated: false
    }));
    builder.addCase(unset, (state) => ({
        ...state,
        user: {},
        isAuthenticated: false,
        error: null
    }));
    builder.addCase(updateUser.fulfilled, (state, action) => ({
        ...state,
        error: ''
    }));
    builder.addCase(updateUser.rejected, (state, action) => ({
        ...state,
        error: action.error['message']
    }));
    builder.addCase(fetchOneUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload.user,
        error: ''
    }));
    builder.addCase(fetchOneUser.rejected, (state, action) => ({
        ...state,
        user: {},
        error: action.error['message']
    }));
});

export default userAuthReducer;
