import { configureStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const { NODE_ENV } = process.env;
const devCompose = composeWithDevTools(applyMiddleware(thunk));
const prodCompose = applyMiddleware(thunk);

const shouldCompose = (NODE_ENV === ('test' || 'development')) ? devCompose : prodCompose;

const store = configureStore(
    shouldCompose
);

export default store;
