import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { addFlashMessage } from './flashMessage';
import types from './types';

const { SERVER_URL } = process.env;

const { SET_CURRENT_USER } = types;

/**
 * @description This creates action for settiing current user
 * @param {object} user object
 * @returns {object} action creator
 */

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user
});

export const logoutUser = () => (
  (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
);

export const loginUser = (userData) => (
  (dispatch) => {
    const { token, user } = userData;
    localStorage.setItem('authorization', token);
    localStorage.setItem('user', user);
    setAuthToken(token);
    dispatch(setCurrentUser(user));
  }
);

/**
 * @description send request to server to login user
 * @param {object} payload
 * @returns {object} It returns axios success response object or error object on error
 */

export const login = (userData) => (
  (dispatch) => (
    axios
    .post(`${SERVER_URL}/login`, userData)
    .then((response) => {
      dispatch(addFlashMessage({
        type: 'success',
        text: response.data.message
      }));
      dispatch(loginUser(response.data));
      return response;
    })
    .catch(
      (errors) => {
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }));
        return errors;
      }
    )
  )
);

/**
 * @description sends reset password mail
 * @param {object} payload
 * @returns {promise} axios promise
 */

export const sendResetPasswordMail = (payload) => (
  (dispatch) => axios
  .post(`${SERVER_URL}/users/reset_password`, payload)
  .then((response) => {
    dispatch(addFlashMessage({
      type: 'success',
      text: response.data.message
    }));
    return response;
  })
  .catch((errors) => {
    dispatch(addFlashMessage({
      type: 'error',
      text: errors.response.data.message
    }));
    return errors;
  })
);

/**
 * @description This resets user's password
 * @param {object} payload
 * @returns {promise} Axios promise object
 */

export const resetPassword = (payload) => (
  (dispatch) => axios
  .post(`${SERVER_URL}/auth/reset-password/`, payload)
  .then((response) => {
    dispatch(addFlashMessage({
      type: 'success',
      text: response.data.message
    }));
    return response;
  })
  .catch((errors) => {
    dispatch(addFlashMessage({
      type: 'error',
      text: errors.response.data.message
    }));
    return errors;
  })

);

export const changePassword = (user) => (
  dispatch => axios.put(`${SERVER_URL}/users/${user.id}`, user)
  .then((response) => {
    dispatch(addFlashMessage({
      type: 'success',
      text: response.data.message
    }));
    dispatch(logoutUser());
    return response;
  })
  .catch((errors) => {
    dispatch(addFlashMessage({
      type: 'error',
      text: errors.response.data.message
    }));
    return errors;
  })
);