import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

/**
 * @description The entry point - this will render the application with it's
 * route on the DOM
 * @returns {void}
 */

 ReactDOM.render(
    <Provider>
        <App/>
    </Provider>,
    document.getElementById('root')
 );
