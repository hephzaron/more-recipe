import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from '../components/App';
import Modal from '../components/Modal';
import HomePage from '../components/HomePage';

/**
 * @function Routes
 * @param {void} null
 * @return {JSX} JSX element
 */
const Routes = () => (
  <Router>
    <App>
      <Route exact component={HomePage}/>
      <Modal/>
    </App>
  </Router>
);

export default Routes;
