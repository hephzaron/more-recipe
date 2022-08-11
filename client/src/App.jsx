import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
   * A class method of superclass Component
   * @method componentDidMount
   * @memberof App
   * @param {null} void
   * @returns { null } void
   */
  componentDidMount() {
    this.setState({
      recipes: [...this.props.recipes]
    });
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

App.propTypes = {
  recipes: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  recipes: state.recipes
});

export { App };
export default connect(mapStateToProps)(App);
