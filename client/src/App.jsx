import React, { Component } from 'react';
import '../public/css/bootstrap.css';
import '../public/css/color.css';
import '../public/css/image.css';
import '../public/css/font-awesome.css';
import '../public/css/responsive.css';
import '../public/scss/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/general/Header';
import Notification from './components/general/Notification';

/**
 * React App
 * @class App
 * @param {null} void
 */
class App extends Component {
  /**
   * render
   * @memberof App
   * @returns { object } JSX
   */
  render = () => (
      <div>
        <Header path />
      </div>
    );
}

export default App;
