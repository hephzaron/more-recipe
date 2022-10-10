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

export default {};
