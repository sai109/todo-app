import { Document } from 'mongoose';

interface ITodo extends Document {
	body: string;
	completed: boolean;
}
