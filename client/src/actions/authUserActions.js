import axios from 'axios';
import dotEnv from 'dotenv';
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import setAccessToken from '../utils/setAccessToken';

dotEnv.config();

const { SERVER_URL } = process.env;

export const set = createAction('user/set');
export const unset = createAction('user/unset');

/**
 * loginUser
 * @description login a user
 * @param {object} userPayload - user payload to be login
 * @returns { promise } -Axios http response from the server
 */

export const loginUser = createAsyncThunk(
    'user/loginStatus',
    async (userPayload) => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`, userPayload);
            const { user, token } = response.data;
            localStorage.setItem('x-access-token', token);
            localStorage.setItem('userPayload', JSON.stringify(user));
            setAccessToken(token);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

export const logoutUser = () => (
    dispatch => {
        setAccessToken(false);
        localStorage.clear();
        dispatch(unset());
    }
);
