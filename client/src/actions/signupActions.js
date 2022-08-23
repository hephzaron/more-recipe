import axios from 'axios';
import dotEnv from 'dotenv';
import { loginUser, setCurrentUserFailure } from './authUserActions';

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * @description Makes network request to create an account for user
 * @param {object} userPayload - user payload for creating a new user
 * @returns { promise } Axios http response
 */
export const registerUser = (userPayload) => (
    dispatch => {
        const { email, password } = userPayload;
        return axios.post(`${SERVER_URL}/signup`, userPayload)
        .then((response) => {
            dispatch(loginUser({ email, password }));
            return response.data;
        })
        .catch((error) => {
            dispatch(setCurrentUserFailure(error.response.data['message']));
            if (error.response.status > 201) {
                return Promise.reject(error.response.data);
            }
            return error.response.data;
        });
    }
);

export default {};
