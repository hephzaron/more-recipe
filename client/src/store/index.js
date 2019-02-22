import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import dotEnv from 'dotenv';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

dotEnv.config();
const { NODE_ENV } = process.env;

const devCompose = composeWithDevTools(applyMiddleware(thunk));
const prodCompose = applyMiddleware(thunk);
const shouldCompose = NODE_ENV === 'development' ?
  devCompose : prodCompose;

const store = createStore(
  rootReducer,
  shouldCompose
);

export default store;