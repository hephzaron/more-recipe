import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './assets/css/card.css';
import './assets/css/header.css';
import './assets/css/homepage.css';
import './assets/css/user-form.css';
import './assets/css/custom-header.css';
import './assets/css/flash-message.css';
import HomePage from './components/pages/HomePage';
import SignupForm from './components/pages/UserForm/SignupForm';
import LoginForm from './components/pages/UserForm/LoginForm';
import Header from './components/general/Header';
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
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <SignupForm />
            </Route>
            <Route path="/login">
              <LoginForm/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}


export default App;
