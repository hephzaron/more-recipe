import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    this.toggleNav = this.toggleNav.bind(this);
  }

/**
 * @description Creates an instance of Header class
 * @param { string } uri
 * @return {void}
 */
  navTo = (uri) => {
    window.location.href = window.location.origin + uri;
    const aTag = document.getElementsByTagName('a');
    console.log(aTag);
  }

  submitSearchForm = async (event) => {
    event.preventDefault();
    console.log(this.state.values);
  }

  inputChangeHandler = (event) => {
    this.setState({ values: { [event.target.name]: event.target.value } });
  }

  toggleNav = () => {
    const topNav = document.getElementById('topnav');
    topNav.style.display = topNav.style.display === "block" ? "" : "block";
  }

  /**
 * @description Creates an instance of Header class
 * @param { void } null
 * @return {JSX} JSX Elements
 */
  render() {
    const { values, uri } = this.state;
    return (
        <div>
          <span id="toggle-nav" onClick= {() => this.toggleNav()}>
            <i className="fa fa-bars"/>
          </span>
        <div className="topnav" id="topnav">
          <a className={`${uri === '/' ? 'active' : ''}`} onClick={() => {
            this.navTo('/');
            }}><FontAwesomeIcon icon={faHome}/></a>
          <a className={`${uri === '/about-us' ? 'active' : ''}`} onClick={() => {
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
          {
            !this.props.isAuthenticated &&
            <div className="center-nav">
              <button onClick={() => {
                this.navTo('/register');
                }} className="user-auth-join-us">JOIN US </button>
              <button onClick={() => {
                this.navTo('/login');
                }} className="user-auth-login">LOGIN </button>
            </div>
          }
          {
            this.props.isAuthenticated &&
            <ul className="auth-header">
              <li><a>My Favorites</a></li>
              <li><a>Create Recipe</a></li>
              <li><a id="user-notification"><FontAwesomeIcon icon={faBell}/>
                <span className="no-of-notification"/></a>
              </li>
              <li>
                <a className="user-image" id="user-profile">
                <img src="https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all" alt="Recipe" className="profile_img" />
                </a>
              </li>
            </ul>
          }
        </div>
        </div>
      );
    }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuthReducer.isAuthenticated,
  user: state.userAuthReducer.user
});


export default connect(mapStateToProps)(Header);
