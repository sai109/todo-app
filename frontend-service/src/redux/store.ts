import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

export default createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);
