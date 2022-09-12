import axios from 'axios';
import dotEnv from 'dotenv';
import { createAsyncThunk } from "@reduxjs/toolkit";

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * changePassword
 * @description Changes a user password
 * @param {integer} userId - user id to change password
 * @returns { promise } -Axios http response from the server
 */
export const changePassword = createAsyncThunk(
    'user/changePasswordStatus',
    async (userPayload) => {
        const {
            userId, oldPassword, newPassword, confirmPassword
        } = userPayload;
        try {
            const response = await axios.put(
                `${SERVER_URL}/users/${userId}`, { oldPassword, newPassword, confirmPassword }
                );
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

export default {};