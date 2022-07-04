import React, { Component } from 'react';
import '../../assets/css/header.css';

/**
 * @class Header
 * @extends { React.Component }
 * @description This renders the Header component
 * @param { object } props
 * @return { JSX } - JSX Header Component
 */
class Header extends Component {
/**
 * @description Creates an instance of Header class
 * @param { string } uri
 * @return {void}
 */
  navTo = (uri) => {
    window.location.href = window.location.origin + uri;
  }

  render =() => (
      <div className="App-header">
        <h1
          onClick={() => {
            this.navTo('');
          }}>
          WAW-RECIPE
        </h1>
        <h2
          onClick={() => {
            this.navTo('');
          }}>
          Home
        </h2>
        <h2
          onClick={() => {
            this.navTo('/recipes');
          }}>
          View Recipe
        </h2>
        <h2
          onClick={() => {
            this.navTo('/recipe');
          }}>
          New Post
        </h2>
		<h2
          onClick={() => {
            this.navTo('/user');
          }}>
          User
        </h2>
      </div>
    );
}

export default Header;
