import { Schema, Document, Model, model } from 'mongoose';

export interface ITodo extends Document {
	body: string;
	completed: boolean;
}

const todoSchema = new Schema({
	body: String,
	completed: {
		type: Boolean,
		default: false,
	},
	_creator: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

export const Todo: Model<ITodo> = model('todo', todoSchema);
