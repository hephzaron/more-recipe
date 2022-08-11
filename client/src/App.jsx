import React, { Component } from 'react';
import '../public/css/bootstrap.css';
import '../public/css/color.css';
import '../public/css/image.css';
import '../public/css/font-awesome.css';
import '../public/css/responsive.css';
import '../public/scss/main.scss';
import './assets/css/card.css';
import './assets/css/header.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
/**
 * React App
 * @class App
 * @param {null} void
 */
class App extends Component {
  /**
   * Create an App instance
   * @method constructor
   * @memberof App
   * @param { object } props
   * @returns { null } void
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  /**
   * Renders HomePage Component
   * @method render
   * @memberof App
   * @param {null} void
   * @returns { JSX }  JSX component
   */
  render = () => (
      <div>
        <HomePage
          recipes= {this.state.recipes}/>
      </div>
    );
}

export default App;
