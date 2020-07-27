import { IErrorReducer } from '../../interfaces/reducer';

export default (state: IErrorReducer = {}, action: any) => {
	switch (action.type) {
		case 'GET_ERRORS':
			return action.payload;
		case 'CLEAR_ERRORS':
			return {};
		default:
			return {};
	}
};
