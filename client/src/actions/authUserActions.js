import axios from 'axios';
import dotEnv from 'dotenv';
import types from './actionTypes';
import setAccessToken from '../utils/setAccessToken';

dotEnv.config();

const { SERVER_URL } = process.env;
const { SET_CURRENT_USER, SET_CURRENT_USER_FAILURE, UNSET_CURRENT_USER } = types;

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: { user }
});

export const setCurrentUserFailure = (error) => ({
    type: SET_CURRENT_USER_FAILURE,
    payload: { error }
});

export const unsetCurrentUser = () => ({
    type: UNSET_CURRENT_USER,
    payload: { user: {} }
});

export const loginUser = (userPayload) => (
    dispatch => (
        axios.post(`${SERVER_URL}/login`, userPayload)
        .then((response) => {
            const { user, token } = response.data;
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('userPayload', JSON.stringify(user));
            setAccessToken(token);
            dispatch(setCurrentUser(user));
            return response.data;
        })
        .catch((error) => {
            dispatch(setCurrentUserFailure(error.response.data['message']));
            if (error.response.status > 201) {
                return Promise.reject(error.response.data);
            }
            return error.response.data;
        })
    )
);

export const logoutUser = () => (
    dispatch => {
        setAccessToken(false);
        localStorage.clear();
        dispatch(unsetCurrentUser());
    }
);
