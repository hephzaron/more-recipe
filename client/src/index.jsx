import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading';
import 'bootstrap/dist/js/bootstrap';
import '../public/css/bootstrap.css';
//import '../public/css/color.css';
//import '../public/css/main.css';
import '../public/scss/main.scss';
import '../public/css/font-awesome.css';
import '../public/css/flaticon.css';
import '../public/css/slick-slider.css';
import HomePage from './components/HomePage';
import Modal from './components/Modal';
import store from './store';
import { addFlashMessage } from './actions/flashMessage';
import { setCurrentUser, logoutUser } from './actions/userAuth';
import setAuthToken from './utils/setAuthToken';

/**
 * @description Request interceptor
 */

axios.interceptors.request.use((response) => {
	store.dispatch(showLoading());
	return response;
}, () => {
	store.dispatch(showLoading());
});

/**
* @description response  interceptor
*/

axios.interceptors.response.use((response) => {
	store.dispatch(hideLoading());
	return response;
}, (error) => {
	console.log('err', error);
	store.dispatch(hideLoading());
	if (error.response.status === 401 || error.response.status === 403) {
			store.dispatch(addFlashMessage({
					type: 'error',
					text: error.response.data
			}));
			store.dispatch(logoutUser());
	}
	return Promise.reject(error);
});

if (localStorage.authToken) {
	setAuthToken(localStorage.authToken);
	store.dispatch(setCurrentUser(JSON.parse(localStorage.userPayload)));
}

/**
 * @description The entry point - this will render the application with it's
 * route on the DOM
 * @returns {void}
 */

render(
	<Provider store= {store}>
		<Fragment>
			<HomePage/>
			<Modal/>
		</Fragment>
	</Provider>,
	document.getElementById('app')
);
