import { combineReducers } from 'redux';
import recipeReducer from './recipes';
import paginationReducer from './pagination';

const reducer = combineReducers({ recipeReducer, paginationReducer });

export default reducer;
