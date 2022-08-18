import _ from 'lodash';
import types from '../actions/actionTypes';
import { initialUserState } from './initialState';

const {
    SET_CURRENT_USER,
    SET_CURRENT_USER_FAILURE,
    UNSET_CURRENT_USER
} = types;

const userAuthReducer = (state = initialUserState, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload.user,
                error: null,
                isAuthenticated: !_.isEmpty(action.payload.user)
            };
        case SET_CURRENT_USER_FAILURE:
            return {
                ...state,
                user: {},
                error: action.payload.error,
                isAuthenticated: false
            };
        case UNSET_CURRENT_USER:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
                error: null
            };
        default:
            return state;
    }
};

export default userAuthReducer;
