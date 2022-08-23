import types from '../actions/actionTypes';
import { initialFlashMessageState } from './initialState';

const { SET_FLASH_MESSAGE, UNSET_FLASH_MESSAGE } = types;

const flashMessageReducer = (state = initialFlashMessageState, action = {}) => {
    switch (action.type) {
        case SET_FLASH_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type
            };
        case UNSET_FLASH_MESSAGE:
            return {
                ...state,
                message: '',
                type: ''
            };
        default:
            return state;
    }
};

export default flashMessageReducer;
