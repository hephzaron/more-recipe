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

export default {};
