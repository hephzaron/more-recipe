import axios from 'axios';
import dotEnv from 'dotenv';
import { loginUser } from './authUserActions';

dotEnv.config();

const { SERVER_URL } = process.env;

/**
 * @description Makes network request to create an account for user
 * @param {object} userPayload - user payload for creating a new user
 * @returns { promise } Axios http response
 */
const registerUser = (userPayload) => (
    dispatch => {
        const { email, password } = userPayload;
        axios.post(`${SERVER_URL}/signup`, userPayload)
        .then((response) => {
            dispatch(loginUser({ email, password }));
            return response;
        })
        .catch((error) => {
            dispatch();
            return error;
        });
    }
);

export default registerUser;
