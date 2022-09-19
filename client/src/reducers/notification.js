import { createReducer } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { initialNotificationState } from './initialState';
import { setNotifications } from '../actions/notificationActions';

const uniqueNotifications = (notifications) => (
    uniqBy(
        notifications.sort((prev, next) => {
            return (prev.updatedAt - next.updatedAt) ? -1 : 1;
        }), 'id'
    )
);

const notificationReducer = createReducer(initialNotificationState, (builder) => {
    builder.addCase(setNotifications, (state, action) => {
        const notifications = uniqueNotifications([...action.payload.notifications, ...state.notifications]);
            return ({
                ...state,
                notifications
            });
        });
    });

export default notificationReducer;
