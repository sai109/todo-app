const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	task: String,
	completed: Boolean,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	}
});

modules.export = { Todos: mongoose.model('todo', todoSchema) };
