import { combineReducers } from 'redux';
import flashMessage from './flashMessage';
import auth from './userAuth';

const reducers = combineReducers({
  flashMessage,
  auth
});

export default reducers;