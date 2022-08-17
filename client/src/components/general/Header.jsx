import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,  faSearch } from "@fortawesome/free-solid-svg-icons";

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
            }}><FontAwesomeIcon icon={faHome}/></a>
          <a onClick={() => {
            this.navTo('/about-us');
            }}>About Us</a>
          <div className="search-container">
            <form className="search-item" onSubmit={this.submitSearchForm}>
              <FontAwesomeIcon className="fa-search" icon={faSearch}/>
              <input
                type="text"
                name="searchTerm"
                value={values.searchTerm}
                onChange={this.inputChangeHandler}/>
            </form>
          </div>
          <button onClick={() => {
            this.navTo('/register');
            }} className="user-auth-join-us">JOIN US </button>
          <button onClick={() => {
            this.navTo('/login');
            }} className="user-auth-login">LOGIN </button>
          <div className="user-profile">
            <div className="user-notification">
              <span className="notification"><i className="fa fa-bell-o fa-lg"/></span>
              <span className="no-of-notification"/>
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
