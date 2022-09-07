import { combineReducers } from 'redux';
import paginationReducer from './pagination';
import userAuthReducer from './userAuth';
import flashMessageReducer from './flashMessage';
import modalReducer from './modal';
import photoReducer from './photo';
import recipeReducer from './recipes';

const reducer = combineReducers({
    recipeReducer,
    paginationReducer,
    userAuthReducer,
    flashMessageReducer,
    modalReducer,
    photoReducer
});

export default reducer;
