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
                `${SERVER_URL}/users/${userId}`, { password: newPassword, oldPassword, confirmPassword }
                );
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

/**
 * sendResetLink
 * @description Sends a password reset link to a user
 * @param {string} email - user email requesting for a rest link
 * @returns { promise } -Axios http response from the server
 */
export const sendResetLink = createAsyncThunk(
    'user/sendResetLinkStatus',
    async ({ email }) => {
        try {
            const response = await axios.post(`${SERVER_URL}/users/reset_password`, { email });
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);

export const createNewPassword = createAsyncThunk(
    'user/createNewPasswordStatus',
    async (payload) => {
        const {
            token, email, password, confirmPassword
        } = payload;
        try {
            const response = await axios.post(
                `${SERVER_URL}/auth/reset_password?token=${token}`, { email, password, confirmPassword }
                );
            return response.data;
        } catch (error) {
            return Promise.reject(error.response.data);
        }
    }
);
