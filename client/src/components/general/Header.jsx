import React, { Component } from 'react';
import '../../assets/css/header.css';

/**
 * @class Header
 * @extends { React.Component }
 * @description This renders the Header component
 * @param { object } event
 * @return { JSX } - JSX Header Component
 */
class Header extends Component {
  /**
 * @description Creates an instance of Header class
 * @return {void}
 */
  constructor() {
    super();
    this.state = {
      values: {
        searchTerm: "",
      }
    };
  }

/**
 * @description Creates an instance of Header class
 * @param { string } uri
 * @return {void}
 */
  navTo = (uri) => {
    window.location.href = window.location.origin + uri;
  }

  submitSearchForm = async (event) => {
    event.preventDefault();
    console.log(this.state.values);
  }

  inputChangeHandler = (event) => {
    this.setState({ values: { [event.target.name]: event.target.value } });
  }

  /**
 * @description Creates an instance of Header class
 * @param { void } null
 * @return {JSX} JSX Elements
 */
  render() {
    const { values } = this.state;
    return (
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
            <form onSubmit={this.submitSearchForm}>
              <input
                type="text"
                placeholder="Search.."
                name="searchTerm"
                value={values.searchTerm}
                onChange={this.inputChangeHandler}/>
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
}

export default Header;
