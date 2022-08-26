import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setCurrentUser } from './actions/authUserActions';
import setAccessToken from './utils/setAccessToken';
import store from './store';
import App from './App';


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
