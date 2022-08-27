import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './assets/css/card.css';
import './assets/css/header.css';
import './assets/css/homepage.css';
import './assets/css/user-form.css';
import './assets/css/custom-header.css';
import './assets/css/flash-message.css';
import './assets/css/recipe-form.css';
import HomePage from './components/pages/HomePage';
import SignupForm from './components/pages/UserForm/SignupForm';
import LoginForm from './components/pages/UserForm/LoginForm';
import Header from './components/general/Header';
import RecipeForm from './components/pages/RecipeForm';
//import CustomHeader from './components/general/CustomHeader';

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
              {this.props.isAuthenticated && <Route path="recipes" element={<RecipeForm/>}/>}
              <Route path="*"
                    element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuthReducer.isAuthenticated
});

export default connect(mapStateToProps)(App);
