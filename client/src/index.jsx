import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { setCurrentUser, logoutUser } from './actions/authUserActions';
import setAccessToken from './utils/setAccessToken';
import { addFlashMessage } from './actions/flashMessageActions';
import store from './store';
import App from './App';

/**
 * @description Axios request interceptor
 */
axios.interceptors.request.use((response) => {
    store.dispatch(showLoading(true));
    return response;
}, (error) => {
    store.dispatch(hideLoading());
    return error;
});

/**
 * @description Axios response interceptor
 */
axios.interceptors.response.use((response) => {
    store.dispatch(hideLoading());
    return response;
}, (error) => {
    const { status, data } = error.response;
    store.dispatch(hideLoading());
    if (status >= 400) {
        store.dispatch(addFlashMessage({
            message: data.message,
            type: 'failure'
        }));
        store.dispatch(logoutUser());
    }
    return Promise.reject(error);
});

if (localStorage['x-access-token']) {
    const accessToken = localStorage.getItem('x-access-token');
    const userPayload = localStorage.getItem('userPayload');
    setAccessToken(accessToken);
    store.dispatch(setCurrentUser(JSON.parse(userPayload)));
}
/**
 * @description The entry point - this will render the application with it's
 * route on the DOM
 * @returns {void}
 */

 ReactDOM.render(
    <Provider store= {store}>
        <App/>
    </Provider>,
    document.getElementById('root')
 );
