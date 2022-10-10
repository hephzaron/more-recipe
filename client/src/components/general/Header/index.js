import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faSearch, faBell, faCaretUp, faStar, faLayerGroup, faCirclePlus, faCircleInfo, faKey, faSignOut, faUser
} from "@fortawesome/free-solid-svg-icons";
import classnames from 'classnames';
import FlashMessage from '../FlashMessage';
import useHeader from './HeaderCustomHook';
import { logoutUser } from '../../../actions/authUserActions';
import { showModal } from '../../../actions/modalActions';

const Header = () => {
    const navigate = useNavigate();
    const headerHook = useHeader({ logoutUser, showModal });
    const defaultPhotoUrl = "https://res.cloudinary.com/power-mobile/image/upload/v1663155102/signed_recipe_upload/profile-avatar.jpg";

    const {
      values, isAuthenticated, user, flashMessageType, isNew,
      isAvailable, logOut, toggleNav, displayRecipeModal,
      displayChangePasswordModal, toggleProfileList, inputChangeHandler,
      submitSearchForm, getAllRecipes, getSavedRecipes, getMyRecipes,
      wrapperRef, showNotifications, showUserForm
    } = headerHook;

    const { profilePhotoUrl, username } = user;

    const userPhoto = profilePhotoUrl || defaultPhotoUrl;
    return (
        <div>
          { flashMessageType && <FlashMessage/>}
          <span id="toggle-nav" onClick= {() => toggleNav()}>
            <i className="fa fa-bars"/>
          </span>
          <div className="topnav" id="topnav">
            <ul className="auth-header left">
              <hr className ="hidden-header"/>
              <li>
                <a onClick={getAllRecipes}>
                  <FontAwesomeIcon className="header-icon" icon={faHome}/>
                  <span className="header-content">Home</span>
                </a>
              </li>
              <li>
                <a onClick={() => { navigate('/about-us'); }}>
                  <FontAwesomeIcon className="header-icon" icon={faCircleInfo}/>
                  <span className="header-content">About Us</span>
                </a>
              </li>
              <hr className ="hidden-header"/>
              <li>
                <div className="search-container">
                  <form className="search-item" onSubmit={submitSearchForm}>
                    <FontAwesomeIcon className="fa-search" icon={faSearch}/>
                    <input
                      type="text"
                      name="searchTerm"
                      value={values.searchTerm}
                      onChange={inputChangeHandler}/>
                  </form>
                </div>
              </li>
            </ul>
            {
              !isAuthenticated &&
              <div className="center-nav">
                <button onClick={() => {
                  navigate('/register');
                  }} className="user-auth-join-us">JOIN US </button>
                <button onClick={() => {
                  navigate('/login');
                  }} className="user-auth-login">LOGIN </button>
              </div>
            }
            {
              isAuthenticated &&
              <ul className="auth-header">
                <li>
                  <a onClick={getSavedRecipes}>
                    <FontAwesomeIcon className="header-icon" icon={faStar}/>
                    <span className="header-content">My Favorites</span>
                  </a>
                </li>
                <li>
                  <a onClick={getMyRecipes}>
                    <FontAwesomeIcon className="header-icon" icon={faLayerGroup}/>
                    <span className="header-content">My Recipes</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => displayRecipeModal()}>
                    <FontAwesomeIcon className="header-icon" icon={faCirclePlus}/>
                    <span className="header-content">Create Recipe</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li>
                  <a id="user-notification" onClick={() => showNotifications()}>
                    <FontAwesomeIcon className="header-icon" icon={faBell}/>
                    { (isNew || isAvailable) && <i className="no-of-notification"/>}
                    <span className="header-content">Notifications</span>
                  </a>
                </li>
                <li className="hidden-header">
                  <a onClick={() => displayChangePasswordModal()}>
                    <FontAwesomeIcon className="header-icon" icon={faKey}/>
                    <span className="header-content">Change Password</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li>
                  <a>
                  <img
                    src={userPhoto}
                    alt="Recipe"
                    className="profile-img"
                    onClick={() => toggleProfileList()}/>
                  <FontAwesomeIcon className={classnames("hidden-header header-icon")} icon={faUser}/>
                  <span
                    className="hidden-header header-content"
                    onClick={() => showUserForm()} >Edit Profile</span>
                  </a>
                </li>
                <hr className ="hidden-header"/>
                <li className="hidden-header">
                  <a onClick={logOut}>
                    <FontAwesomeIcon className="header-icon" icon={faSignOut}/>
                    <span className="header-content">Logout</span>
                  </a>
                </li>
              </ul>
            }
          </div>
          {
            isAuthenticated &&
            <div ref = {wrapperRef} className="profile-dropdown" id="profile-dropdown">
              <FontAwesomeIcon className="profile-dropdown-caret" icon={faCaretUp}/>
              <ul id="profile-menu">
                <li>
                  <img src={userPhoto}/>
                  <a>{username}</a>
                </li>
                <li>
                  <a onClick={() => { navigate('edit-profile'); }}>Edit Profile</a>
                </li>
                <li>
                  <a onClick={() => displayChangePasswordModal()}>Change Password</a>
                </li>
                <hr/>
                <li>
                  <a style={{ position: "relative", bottom: "-10px" }}
                  onClick = {logOut}>Logout</a>
                </li>
              </ul>
            </div>
          }
        </div>
      );
};

export default Header;
