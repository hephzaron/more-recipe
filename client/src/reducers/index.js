import { combineReducers } from 'redux';
import recipeReducer from './recipes';
import paginationReducer from './pagination';
import userAuthReducer from './userAuth';

const reducer = combineReducers({ recipeReducer, paginationReducer, userAuthReducer });

export default reducer;
