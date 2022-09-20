import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import _ from "lodash";
import useNotification from './NotificationCustomHook';

moment.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '1s',
      ss: '%ss',
      m: '1m',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: '1M',
      MM: '%dM',
      y: '1Y',
      yy: '%dY'
    }
  });

const pixUrl = "https://res.cloudinary.com/power-mobile/image/upload/v1663155102/signed_recipe_upload/profile-avatar.jpg";

const Notification = () => {
    const notificationHook = useNotification();

    const { userId, notificationList } = notificationHook;

    /**
     * This groups the list of notification by recipe Id's and the type
     */
    const notificationGroups = _(notificationList).groupBy(
        (item) => ([item['recipeId'], item['notificationType']])
        ).map((value, key) => ({
            uniqueId: value[0]['recipeId'],
            notificationType: value[0]['notificationType'],
            count: value.length,
            notifications: value
        })).value();

    const totalUpdate = notificationGroups.length;

    if (totalUpdate > 0) {
        return (
            <ul id="notification">
                <h5> Notifications </h5>
                <span><i>{`${totalUpdate}`}</i></span>
                <hr/>
                {
                    notificationGroups.map((group) => {
                        const {
                            count, notifications, uniqueId, notificationType
                        } = group;
                        const { User, creator, Recipe } = notifications[0];
                        const creatorPhoto = (User.profilePhotoUrl === null) ? pixUrl : creator.profilePhotoUrl;
                        return (
                            <li key={uniqueId}>
                                <a>
                                    <img alt = {User.id} src={creatorPhoto}/>
                                    <div className="user-on"/>
                                    {
                                        (notificationType === 'Likes') &&
                                        <span>
                                            {
                                                `${creator.username}
                                                ${count > 1 ? `and ${count - 1} others` : ''} liked 
                                                ${(User.id === userId) ? 'your post on' : ''} ${Recipe.name}`
                                            }
                                        </span>
                                    }
                                    {
                                        (notificationType === 'Reviews') &&
                                        <span>
                                            {
                                                `${creator.username}
                                                ${count > 1 ? `and ${count - 1} others` : ''} added a review to
                                                ${(User.id === userId) ? 'your post on' : ''} ${Recipe.name}`
                                            }
                                        </span>
                                    }
                                </a>
                                <Moment className="duration" fromNow>
                                    {Recipe.updatedAt}
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
