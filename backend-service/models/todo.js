const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	body: String,
	completed: {
		type: Boolean,
		default: false
	},
	_creator: {
		type: Schema.Types.ObjectId,
		required: true
	}
});

module.exports = { Todo: mongoose.model('todo', todoSchema) };
