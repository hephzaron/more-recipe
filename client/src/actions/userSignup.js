import axios from 'axios';
import dotEnv from 'dotenv';
import { loginUser } from './userAuth';
import { addFlashMessage } from './flashMessage';

dotEnv.config();
const { SERVER_URL } = process.env;

console.log('url', SERVER_URL);
/**
 * @description This makes network request to create an  account for user
 * @param {object} userData - user data for creating a new user
 * @returns {promise} Axios http response
 */
export const userSignupRequestAction = (userData) => (
  (dispatch) => (
    axios
    .post('http://127.0.0.1:5000/api/v1/signup', userData)
    .then((response) => {
      dispatch(addFlashMessage({
        type: 'success',
        text: response.data.message
      }));
      dispatch(loginUser(response.data.userPayload));
      return response;
    })
    .catch((errors) => {
      if (errors.response) {
        dispatch(addFlashMessage({
          type: 'error',
          text: errors.response.data.message
        }));
      }
      console.log(errors);
      return errors;
    })
  )
);

export default {};