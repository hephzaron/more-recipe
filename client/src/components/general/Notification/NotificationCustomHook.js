import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const notification = useSelector((state) => state.notificationReducer.notification);
    const {
        name, photoUrl, user, Notifications
    } = notification;

    useEffect(() => {
        if (Notifications) {
            setNotifications([...Notifications]);
        }
    }, [notification]);
    return {
        user,
        notifications,
        recipeName: name,
        recipePhoto: photoUrl,
    };
};

export default useNotification;
