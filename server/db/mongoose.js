const mongoose = require('mongoose');
const logger = require('../../logger/logger');

// allows promises to be used with mongoose operations
mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true })
	.then()
	.catch(e => logger.error(`Unable to connect to MongDB: ${e}`));

module.exports = { mongoose };
