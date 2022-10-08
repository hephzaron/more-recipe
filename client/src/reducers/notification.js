import { createReducer } from '@reduxjs/toolkit';
import { uniqBy } from 'lodash';
import { initialNotificationState } from './initialState';
import { setNotifications } from '../actions/notificationActions';

/**
 * Make list of notifications unique
 * @param {array} notifications
 * @returns {bool} 1 1
 */
const uniqueNotifications = (notifications) => (
    uniqBy(
        notifications.sort((prev, next) => {
            if ((prev.updatedAt - next.updatedAt) > 0) {
                return -1;
            }
            return 1;
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
