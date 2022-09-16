import React from 'react';
import Moment from "react-moment";
import useNotification from './NotificationCustomHook';

const pixUrl = "https://res.cloudinary.com/power-mobile/image/upload/v1663155102/signed_recipe_upload/profile-avatar.jpg";

const Notification = () => {
    const notificationHook = useNotification();

    const {
        user, notifications, recipeName, recipePhoto
    } = notificationHook;

    const profilePhoto = recipePhoto === null ? pixUrl : recipePhoto;

    const lastUpdate = notifications[0];
    const totalUpdate = notifications.length;

    if (totalUpdate > 0) {
        return (
            <ul id="notification">
                <h5> Notifications </h5>
                <span><i>{`${totalUpdate}`}</i></span>
                <hr/>
                {
                    notifications.map((notification) => (
                        <li key={notification.id}>
                            <a>
                                <img alt = {user.id} src={profilePhoto}/>
                                <div className="user-on"/>
                                <span>{`${lastUpdate.userId} and ${totalUpdate} others liked your post on ${recipeName}`}</span>
                            </a>
                            <Moment className="duration" fromNow>
                                "2022-09-12"
                            </Moment>
                            <span className="ellipsis">&#8942;</span>
                        </li>
                    ))
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
