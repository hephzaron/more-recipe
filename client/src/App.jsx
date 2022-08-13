import React, { Component } from 'react';
import './assets/css/card.css';
import './assets/css/header.css';
import './assets/css/homepage.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
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
      <div>
        <HomePage/>
      </div>
    );
}

export default App;
