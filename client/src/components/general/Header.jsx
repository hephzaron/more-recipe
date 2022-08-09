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
      <div className="topnav">
        <a className="active" onClick={() => {
          this.navTo('/');
          }}>Home</a>
        <a onClick={() => {
          this.navTo('/recipes');
          }}>Add</a>
        <a onClick={() => {
          this.navTo('/recipes');
          }}>My Recipe</a>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search"/>
            <button type="submit"><i className="fa fa-search"/></button>
          </form>
        </div>
        <div className="user-profile">
          <div className="user-notification">
            <span className="notification"><i className="fa fa-bell-o fa-lg"/></span>
            <span className="no-of-notification">2</span>
          </div>
          <span className="partition"/>
          <div className="user-image">
            <img src="https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all" alt="Recipe" className="profile_img" />
          </div>
        </div>
      </div>
  );
}

export default Header;
