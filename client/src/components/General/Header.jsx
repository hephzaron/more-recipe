import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CustomList from './CustomList';
import { logoutUser } from '../../actions/userAuth';


const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const contextTypes = {
  router: PropTypes.object.isRequired
};
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
 * @param { object } props
 */
	constructor(props) {
		super(props);
		this.state = {
      baseUrl: '',
      numOfNewNotifications: 44
    };
    this.onLogout = this.onLogout.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
    this.showSearchForm = this.showSearchForm.bind(this);
  }

  /**
   * @description This handles user logout
   * @param { object } event
   * @memberof Header
   * @returns {void} null
   */
  onLogout(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.context.router.history.push('/');
  }

  /**
   * @description This handles login form display
   * @param { object } event
   * @memberof Header
   * @returns {void} null
   */
  showLoginForm(event) {
    event.preventDefault();
    this.context.router.history.push('/login');
    window.addEventListener('load', () => {
      document.getElementById('loginmodal').click();
    });
  }

  /**
   * @description This handles signup form display
   * @param { object } event
   * @memberof Header
   * @returns {void} null
   */
  showSignupForm(event) {
    event.preventDefault();
    this.context.router.history.push('/signup');
    window.addEventListener('load', () => {
      document.getElementById('signupmodal').click();
    });
  }

  /**
   * @description This handles search form display
   * @param { object } event
   * @memberof Header
   * @returns {void} null
   */
  showSearchForm(event) {
    event.preventDefault();
    this.context.router.history.push('/search');
    window.addEventListener('load', () => {
      document.getElementById('searchmodal').click();
    });
  }

  /**
   * @description This handles recipeAdd form display
   * @param { object } event
   * @memberof Header
   * @returns {void} null
   */
  showRecipeAddForm(event) {
    event.preventDefault();
    this.context.router.history.push('/recipes/add');
    window.addEventListener('load', () => {
      document.getElementById('newrecipemodal').click();
    });
  }

	/**
	 * @memberof CustomList
	 * @method render
	 * @description Renders JSX Component
	 * @returns {JSX} - JSX Component
	 */
	render() {
		let navbarLeftList = [
			{
        liClass: 'active',
        href: '#',
				aValue: 'Home',
				icon: 'fa-home',
			}, {
				aValue: 'Login',
				icon: 'fa-sign-in',
        modal: true,
        onClick: this.showLoginForm,
        dataTarget: 'loginmodal'
			}, {
				aValue: 'Register',
				icon: 'fa-user-plus',
        modal: true,
        onClick: this.showSignupForm,
        dataTarget: 'signupmodal'
			}
    ];

    const navbarLeftListLoggedIn = [
      {
        liClass: 'dropdown',
				aValue: 'View Recipes',
        icon: 'fa-align-justify',
        href: '#',
				child: 'viewRecipeMenu'
			}, {
				aValue: 'New Recipe',
				icon: 'fa-pencil',
        modal: true,
        onClick: this.showRecipeAddForm,
        dataTarget: 'newrecipemodal'
			}, {
        liClass: 'dropdown',
				aValue: this.props.user.username,
        icon: 'fa-user-circle',
        href: '#',
				child: 'userOptionsMenu'
			}
    ];

		let navbarRightList = [
			{
        href: '#',
        icon: 'fa-search',
        modal: true,
        onClick: this.showSearchForm,
        dataTarget: 'searchmodal'
			}
    ];

    const navbarRightListLoggedIn = [
      {
        liClass: 'dropdown',
        icon: 'fa-bell-o',
        itemId: 'notifications',
        href: '#',
        child: 'notifications',
        spanValue: this.state.numOfNewNotifications
			}
    ];

    navbarLeftList = (this.props.isAuthenticated ? navbarLeftList.slice(0, 1)
      .concat(navbarLeftListLoggedIn) : navbarLeftList);
    navbarRightList = (this.props.isAuthenticated ? navbarRightList
      .concat(navbarRightListLoggedIn) : navbarRightList);


    const recipeList = [
			{
        liClass: 'active',
        href: '#',
				spanValue: 224,
				aValue: 'All Recipes'
			}, {
        liClass: 'active',
        href: '#',
				spanValue: 24,
				aValue: 'My Recipes'
			}, {
        liClass: 'active',
        href: '#',
				spanValue: 5,
				aValue: 'Saved Recipes'
			}
    ];

    const userMenuList = [
			{
        href: '#',
        aValue: 'Edit Profile',
        icon: 'fa-edit'
			}, {
        aValue: 'Change Password',
        icon: 'fa-pencil',
        modal: true,
        dataTarget: 'changepasswordmodal'
			}, {
        href: '#',
        aValue: 'View Profile',
        icon: 'fa-user-circle-o'
			}, {
        href: '#',
        aValue: 'About Us',
        icon: 'fa-question-circle'
			}, {
        href: '#',
        aValue: 'Sign Out',
        icon: 'fa-sign-out',
        onClick: this.onLogout
			}
    ];

    const notificationContent = [
      {
        href: '#',
        imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
        imageAlt: '',
        info: 'Lorem ipsum dolor sit amet, con sectetur yhbjh ghfhvh hjvj elit.',
        duration: '2 days ago '
      }, {
        href: '#',
        imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
        imageAlt: '',
        info: 'Lorem ipsum dolor sit amet, con sectetur yhbjh ghfhvh hjvj elit.',
        duration: '2 days ago '
      }, {
        href: '#',
        imageSrc: require('../../../public/extra-images/flavours-list-img1.jpg'),
        imageAlt: '',
        info: 'Lorem ipsum dolor sit amet, con sectetur yhbjh ghfhvh hjvj elit.',
        duration: '2 days ago '
      }
    ];

		return (
      <nav role="navigation" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>
            <img src={require("../../../public/images/logo.png")} alt="logo"/>
          </div>
          {/** Collection of nav links and other contaent for toggling **/}
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <CustomList
              ulClass="nav navbar-nav"
              listContent={navbarLeftList}>
              <CustomList
                key="viewRecipeMenu"
                ulClass="dropdown-menu"
                listContent={recipeList}/>
              <CustomList
                key="userOptionsMenu"
                ulClass="dropdown-menu"
                listContent={userMenuList}/>
            </CustomList>
            <CustomList
              ulClass="nav navbar-nav navbar-right"
              listContent={navbarRightList}>
              <CustomList
                key = "notifications"
                ulClass="dropdown-menu"
                notificationContent={notificationContent}/>
            </CustomList>
          </div>
        </div>
      </nav>
		);
	}
}

Header.propTypes = propTypes;
Header.contextTypes = contextTypes;

/**
 * @description Maps state from store to props
 * @param {object} state - redux store state
 * @returns {object} map state to props
 */
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

/**
 * @description Maps dispatch to props
 * @param {object} dispatch
 * @returns {object} map dispatch to props
 */
const mapDispatchToProps = (dispatch) => bindActionCreators({
  logoutUser
}, dispatch);

export { Header };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
