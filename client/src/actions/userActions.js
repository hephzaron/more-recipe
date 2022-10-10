/* eslint-disable no-shadow */
import axios from 'axios';
import dotEnv from 'dotenv';
import { createAsyncThunk } from '@reduxjs/toolkit';

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * Get one user
 * @description Get a user from server
 * @param {integer} id - user id
 * @returns { promise } -Axios http response
 */
 export const fetchOneUser = createAsyncThunk(
    'users/fetchOneUserStatus',
    async ({ id }) => {
        try {
            const response = await axios.get(`${SERVER_URL}/users/${id}`);
            localStorage.setItem('userPayload', JSON.stringify(response.data.user));
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

export default {};
