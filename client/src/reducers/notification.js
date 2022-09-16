import { createReducer } from '@reduxjs/toolkit';
import { initialNotificationState } from './initialState';
import { setNotifications } from '../actions/notificationActions';

const notificationReducer = createReducer(initialNotificationState, (builder) => {
    builder.addCase(setNotifications, (state, action) => ({
        ...state,
        notification: action.payload.notification
    }));
});

export default notificationReducer;
