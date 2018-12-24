const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	task: String,
	completed: {
		type: Boolean,
		default: false
	},
	_creator: {
		type: Schema.Types.ObjectId,
		required: true
	}
});

modules.export = { Todos: mongoose.model('todo', todoSchema) };
