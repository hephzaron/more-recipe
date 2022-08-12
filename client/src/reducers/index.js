import { combineReducers } from 'redux';
import recipeReducer from './recipes';

const reducer = combineReducers({ recipeReducer });

export default reducer;
