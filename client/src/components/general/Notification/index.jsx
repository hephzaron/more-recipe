import React from 'react';
import Moment from "react-moment";
import useNotification from './NotificationCustomHook';

const pixUrl = "https://res.cloudinary.com/power-mobile/image/upload/v1663155102/signed_recipe_upload/profile-avatar.jpg";

const Notification = () => {
    const notificationHook = useNotification();

    const {
        User, username, notifications, recipeName, updatedAt
    } = notificationHook;

    const totalUpdate = notifications.length;

    if (totalUpdate > 0) {
        return (
            <ul id="notification">
                <h5> Notifications </h5>
                <span><i>{`${totalUpdate}`}</i></span>
                <hr/>
                {
                    notifications.map((notification) => {
                        const creatorPhoto = (notification.creator.profilePhotoUrl === null) ? pixUrl :
                        notification.creator.profilePhotoUrl;
                        const otherCount = totalUpdate - 1;
                        return (
                            <li key={notification.id}>
                                <a>
                                    <img alt = {User.id} src={creatorPhoto}/>
                                    <div className="user-on"/>
                                    <span>{`${username} ${otherCount > 0 ? `and ${otherCount} others` : ''} liked your post on ${recipeName}`}</span>
                                </a>
                                <Moment className="duration" fromNow>
                                    {updatedAt}
                                </Moment>
                                <span className="ellipsis">&#8942;</span>
                            </li>
                        );
                    })
                }
            </ul>);
        }
        return (
            <div>
                No notifications to show
            </div>
        );
    };

export default Notification;
