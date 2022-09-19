import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const useNotification = () => {
    const notifications = useSelector((state) => state.notificationReducer.notifications);
    const userId = useSelector((state) => state.userAuthReducer.user.id);
    const [notificationList, setNotificationList] = useState([]);

    const previousNotifications = useRef([]);

    useEffect(() => {
        if (previousNotifications !== notifications) {
            setNotificationList([...notifications]);
        }
        previousNotifications.current = notifications;
    }, [notifications]);

    return {
        userId,
        notificationList
    };
};

export default useNotification;
