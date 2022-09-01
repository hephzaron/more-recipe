import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './assets/css/header.css';
import './assets/css/homepage.css';
import './assets/css/user-form.css';
import './assets/css/flash-message.css';
import './assets/css/recipe-form.css';
import './assets/css/modal.css';
import './assets/css/custom-card.css';
import HomePage from './components/pages/HomePage';
import SignupForm from './components/pages/SignupForm';
import LoginForm from './components/pages/LoginForm';
import Header from './components/general/Header';

/**
 * React App
 * @class App
 * @param {null} void
 */
class App extends Component {
 /**
   * Renders HomePage Component
   * @method render
   * @memberof App
   * @param {null} void
   * @returns { JSX }  JSX component
   */
  render = () => (
      <Router>
        <div>
          <Header/>
          <hr/>
          <Routes>
            <Route path="/">
              <Route path="" element={<HomePage/>}/>
              <Route path="register" element={<SignupForm/>}/>
              <Route path="login" element={<LoginForm/>}/>
              <Route path="*"
                    element={
                    <div style={{ padding: "20rem" }}>
                      <p>There's nothing here!</p>
                    </div>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuthReducer.isAuthenticated
});

export default connect(mapStateToProps)(App);
