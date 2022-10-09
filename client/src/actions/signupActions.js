import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import dotEnv from 'dotenv';

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * @description Makes network request to create an account for user
 * @param {object} userPayload - user payload for creating a new user
 * @returns { promise } Axios http response
 */

export const registerUser = createAsyncThunk(
    'user/signupStatus',
    async (userPayload) => {
        try {
            const response = await axios.post(`${SERVER_URL}/signup`, userPayload);
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * @function updateUser
 * @description updates a user
 * @param {integer} userId - Id of user performing the action
 * @returns { promise } -Axios http response from the server
 */
 export const updateUser = createAsyncThunk(
    'user/updateUserStatus',
    async (user) => {
        try {
            const response = await axios.put(`${SERVER_URL}/users/${user.id}`, { ...user });
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);
