const mongoose = require('mongoose');

// allows promises to be used with mongoose operations
mongoose.Promise = global.Promise;
mongoose
	.connect(
		process.env.DB_URL,
		{ useNewUrlParser: true }
	)
	.then()
	.catch(e => console.log(`Unable to connect to MongDB: ${e}`));

module.exports = { mongoose };
