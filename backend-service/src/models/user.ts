import { Schema, model, Model, Document } from 'mongoose';
import * as validator from 'validator';

export interface IUser extends Document {
	email: string;
	password: string;
}

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
});
export const User: Model<any> = model('user', userSchema);
