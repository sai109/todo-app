import { IUser } from './user';

interface ITodoReducer {
	todos: ITodo[];
	todo: ITodo | {};
	loading: boolean;
}

interface IAuthReducer {
	token?: String;
	id?: IUser['_id'];
}

interface IErrorReducer {
	email?: string;
	password?: string;
}
