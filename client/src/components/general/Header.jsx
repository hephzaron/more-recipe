import React, { Component } from 'react';
import CustomList from './CustomList';
import NotificationComponent from './Notification';

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
			countOfSavedRecipe: 0,
			countOfUserCreatedRecipe: 0,
			noOfNewNotifications: 6,
			notifications: [{
				review: true,
				imageAlt: 'imageAlt',
				imageUrl: 'imageUrl',
				message: 'message',
				time: 'time'
			}, {
				reply: true,
				imageAlt: 'imageAlt',
				imageUrl: 'imageUrl',
				message: 'message',
				time: 'time'
			}, {
				like: true,
				imageAlt: 'imageAlt',
				imageUrl: 'imageUrl',
				message: 'message',
				time: 'time'
			}]
		};
	}

	/**
	 * @memberof CustomList
	 * @method render
	 * @description Renders JSX Component
	 * @returns {JSX} - JSX Component
	 */
	render() {
		const listContent = [
			{
				liClass: 'active',
				aValue: 'Home',
				icon: 'fa-home',
			}, {
				aValue: 'View Recipes',
				subNav: true,
				icon: 'fa-align-justify',
				child: 'viewRecipeMenu'
			}, {
				aValue: 'New Post',
				icon: 'fa-pencil'
			}, {
				aValue: this.state.user.username,
				subNav: true,
				icon: 'fa-user-circle',
				child: 'userOptionsMenu'
			}
		];

		const viewRecipeList = [
			{
				aValue: 'Saved Recipes',
				spanValue: this.state.countOfSavedRecipe
			}, {
				aValue: 'My Recipes',
				spanValue: this.state.countOfUserCreatedRecipe
			}, {
				aValue: 'All Recipes'
			}
		];

		const userOptionsList = [
			{
				aValue: 'Edit Profile',
				icon: 'fa-edit'
			}, {
				aValue: 'Change Password',
				icon: 'fa-pencil'
			}, {
				aValue: 'View Profile',
				icon: 'fa-user-circle-o'
			}, {
				aValue: 'About Us',
				icon: 'fa-question-circle'
			}, {
				aValue: 'Sign Out',
				icon: 'fa-sign-out'
			}
		];

		return (
			<header id="wawrecipe-header" className="wawrecipe-header-one">
				<div className="wawrecipe-main-header">
					<div className="container">
						<div className="row">
							<aside className="col-md-2">
								<a href={this.state.baseUrl} className="logo">
									<img src={require('../../../public/images/logo.png')} alt="logo"/>
								</a>
							</aside>
							<aside className="col-md-10">
								{/** Navigation Begins**/}
								<a href="#menu" className="menu-link active"><span/></a>
								<nav id="menu" className="menu navbar navbar-default">
									<CustomList
										listContent={listContent}
										ulClass={"level-1 navbar-nav"}
										identifier={""}>
										<CustomList
											key = {"viewRecipeMenu"}
											listContent={viewRecipeList}
											ulClass={"sub-menu level-2"}/>
										<CustomList
											key = {"userOptionsMenu"}
											listContent={userOptionsList}
											ulClass={"sub-menu level-2"}/>
									</CustomList>
								</nav>
								{/** Navigation Ends**/}
								{/** User Notifications Begins**/}
								<NotificationComponent
									noOfNewNotifications={this.state.noOfNewNotifications}
									notifications={this.state.notifications}/>
							</aside>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
