import { Document } from 'mongoose';

interface ITodo extends Document {
	body: string;
	completed: boolean;
}

interface IUser extends Document {
	email: string;
	password: string;
}
