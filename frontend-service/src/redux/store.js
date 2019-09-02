import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducer/rootReducer';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

export default createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
