import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import socket from './assets/js/socket/config';
import { set } from './actions/authUserActions';
import setAccessToken from './utils/setAccessToken';
import store from './store';
import App from './App';


if (localStorage['x-access-token']) {
    const accessToken = localStorage.getItem('x-access-token');
    const userPayload = localStorage.getItem('userPayload');
    const user = JSON.parse(userPayload);
    setAccessToken(accessToken);
    store.dispatch(set({ user }));
    const updatedAt = moment(new Date());
    socket.emit('event:join', { userId: user.id, updatedAt });
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
