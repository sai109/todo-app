import { combineReducers } from 'redux';
import authReducer from './auth';
import errorReducer from './errors';
import todoReducer from './todo';

export default combineReducers({
	errors: errorReducer,
	user: authReducer,
	todos: todoReducer,
});
