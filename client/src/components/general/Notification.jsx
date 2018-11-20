import React from 'react';
import PropTypes from 'prop-types';
import CustomList from './CustomList';

const propTypes = {
	noOfNewNotifications: PropTypes.number,
	notifications: PropTypes.array.isRequired,
};

/**
 * @function Notifcation
 * @description This renders the Notification component
 * @param { object } props
 * @return { JSX } - JSX Notification Component
 */
const Notification = (props) => {
	let { noOfNewNotifications, notifications } = props;

	if (!noOfNewNotifications >= 1) {
		noOfNewNotifications = '';
	}
	const listContent = [
		{
			aClass: 'fa fa-search',
			aValue: ''
		}, {
			aClass: 'notification fa fa-bell-o',
			child: 'notifications',
			spanValue: noOfNewNotifications,
			aValue: ''
		}
	];

	return (
		<CustomList
			listContent = {listContent}
			ulClass = "wawrecipe-user-list">
			<CustomList
				key={"notifications"}
				identifier="notifications"
				ulClass={"sub-menu level-2 hidden"}
				listContent={notifications}/>
		</CustomList>
	);
};

Notification.propTypes = propTypes;

export default Notification;
