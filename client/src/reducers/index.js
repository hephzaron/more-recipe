import { combineReducers } from 'redux';
import recipeReducer from './recipes';
import paginationReducer from './pagination';
import userAuthReducer from './userAuth';
import flashMessageReducer from './flashMessage';
import modalReducer from './modal';

const reducer = combineReducers({
    recipeReducer, paginationReducer, userAuthReducer, flashMessageReducer, modalReducer
});

export default reducer;
