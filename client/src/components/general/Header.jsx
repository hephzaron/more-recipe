import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faSearch, faBell, faCaretUp, faStar, faLayerGroup, faCirclePlus, faCircleInfo, faKey, faSignOut, faUser
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { logoutUser } from '../../actions/authUserActions';
import { showModal } from '../../actions/modalActions';

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
      },
      showProfile: false
    };
    this.logOut = this.logOut.bind(this);
    this.showModal = this.showModal.bind(this);
  }

/**
 * @description Navigates to the required page
 * @param { string } uri
 * @return {void}
 */
  navTo = (uri) => {
    window.location.href = window.location.origin + uri;
  }

  submitSearchForm = (event) => {
    event.preventDefault();
  }

  inputChangeHandler = (event) => {
    this.setState({ values: { [event.target.name]: event.target.value } });
  }

  toggleProfileList = () => {
    const profileDropdown = document.getElementById('profile-dropdown');
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "" : "block";
  }

  toggleNav = () => {
    const topNav = document.getElementById('topnav');
    topNav.style.display = topNav.style.display === "block" ? "" : "block";
  }

  /**
   * @memberof Header
   * @method logOut
   * @param {null}-void
   * @returns {null} void
   */
  logOut() {
    this.props.dispatch(logoutUser());
    this.navTo('/');
  }

  /**
   * @memberof Header
   * @method showModal
   * @param {null}-void
   * @returns {null} void
   */
   showModal() {
    console.log('here');
    this.props.dispatch(showModal());
  }

  /**
 * @description Creates an instance of Header class
 * @param { void } null
 * @return {JSX} JSX Elements
 */
  render() {
    const { values } = this.state;
    return (
        <div>
          <span id="toggle-nav" onClick= {() => this.toggleNav()}>
            <i className="fa fa-bars"/>
          </span>
          <div className="topnav" id="topnav">
            <ul className="auth-header left">
              <hr className ="hidden-header"/>
              <li>
                <a onClick={() => { this.navTo('/'); }}>
                  <FontAwesomeIcon className="header-icon" icon={faHome}/>
                  <span className="header-content">Home</span>
                </a>
              </li>
              <li>
                <a onClick={() => { this.navTo('/about-us'); }}>
                  <FontAwesomeIcon className="header-icon" icon={faCircleInfo}/>
                  <span className="header-content">About Us</span>
                </a>
              </li>
              <hr className ="hidden-header"/>
              <li>
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
              </li>
            </ul>
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
                <li>
                  <a>
                    <FontAwesomeIcon className="header-icon" icon={faStar}/>
                    <span className="header-content">My Favorites</span>
                  </a>
                </li>
                <li>
                  <a>
                    <FontAwesomeIcon className="header-icon" icon={faLayerGroup}/>
                    <span className="header-content">My Recipes</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => this.showModal()}>
                    <FontAwesomeIcon className="header-icon" icon={faCirclePlus}/>
                    <span className="header-content">Create Recipe</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li>
                  <a id="user-notification">
                    <FontAwesomeIcon className="header-icon" icon={faBell}/>
                    <i className="no-of-notification"/>
                    <span className="header-content">Notifications</span>
                  </a>
                </li>
                <li className="hidden-header">
                  <a>
                    <FontAwesomeIcon className="header-icon" icon={faKey}/>
                    <span className="header-content">Change Password</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li>
                  <a>
                  <img
                    src="https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all"
                    alt="Recipe"
                    className="profile-img"
                    onClick={() => this.toggleProfileList()}/>
                  <FontAwesomeIcon className={classnames("hidden-header header-icon")} icon={faUser}/>
                  <span className="hidden-header header-content" >Daramola Oluwatobi</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li className="hidden-header">
                  <a onClick={this.logOut}>
                    <FontAwesomeIcon className="header-icon" icon={faSignOut}/>
                    <span className="header-content">Logout</span>
                  </a>
                </li>
              </ul>
            }
          </div>
          {
            this.props.isAuthenticated &&
            <div className="profile-dropdown" id="profile-dropdown">
              <FontAwesomeIcon className="profile-dropdown-caret" icon={faCaretUp}/>
              <ul id="profile-menu">
                <li>
                  <img src="https://www.mensjournal.com/wp-content/uploads/2018/10/rambo-main-3.jpg?quality=86&strip=all"/>
                  <a>Daramola Oluwatobi Daramola Oluwatobi</a>
                </li>
                <li>
                  <a>Edit Profile</a>
                </li>
                <li>
                  <a>Change Password</a>
                </li>
                <hr/>
                <li>
                  <a style={{ position: "relative", bottom: "-10px" }}
                  onClick = {this.logOut}>Logout</a>
                </li>
              </ul>
            </div>
          }
        </div>
      );
    }
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuthReducer.isAuthenticated,
  user: state.userAuthReducer.user
});


export default connect(mapStateToProps)(Header);
