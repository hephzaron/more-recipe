import axios from 'axios';

/**
 * @description Sets content type and access token in the headers on every request
 * @param {string} accessToken
 * @returns { null } void
 */
const setAccessToken = (accessToken) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    if (accessToken) {
        axios.defaults.headers.common['authorization'] = accessToken;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
};

export default setAccessToken;
