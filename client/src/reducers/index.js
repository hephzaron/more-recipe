import { combineReducers } from 'redux';
import recipeReducer from './recipes';
import paginationReducer from './pagination';
import userAuthReducer from './userAuth';
import flashMessageReducer from './flashMessage';

const reducer = combineReducers({
    recipeReducer, paginationReducer, userAuthReducer, flashMessageReducer
});

export default reducer;
