import React, { Component } from 'react';
import CustomList from './CustomList';

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
			user: {
				username: 'Username'
			},
			baseUrl: '',
		};
	}

	/**
	 * @memberof CustomList
	 * @method render
	 * @description Renders JSX Component
	 * @returns {JSX} - JSX Component
	 */
	render() {
		const navbarList = [
			{
        liClass: 'active',
        href: '#',
				aValue: 'Home',
				icon: 'fa-home',
			}, {
        liClass: 'dropdown',
				aValue: 'View Recipes',
        icon: 'fa-align-justify',
        href: '#',
				child: 'viewRecipeMenu'
			}, {
				aValue: 'New Recipe',
				icon: 'fa-pencil'
			}, {
        liClass: 'dropdown',
				aValue: this.state.user.username,
        icon: 'fa-user-circle',
        href: '#',
				child: 'userOptionsMenu'
			}, {
				aValue: 'Login',
				icon: 'fa-sign-in'
			}, {
				aValue: 'Register',
				icon: 'fa-user-plus'
			},
    ];

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
        href: '#',
        aValue: 'Change Password',
        icon: 'fa-pencil'
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
        icon: 'fa-sign-out'
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
              listContent={navbarList}>
              <CustomList
                key="viewRecipeMenu"
                ulClass="dropdown-menu"
                listContent={recipeList}/>
              <CustomList
                key="userOptionsMenu"
                ulClass="dropdown-menu"
                listContent={userMenuList}/>
            </CustomList>
          </div>
        </div>
      </nav>
		);
	}
}

export default Header;
