import * as mongoose from 'mongoose';
import logger from '../logger/logger';

// allows promises to be used with mongoose operations
(<any>mongoose).Promise = global.Promise;
mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true })
	.then()
	.catch(() => logger.error('Unable to connect to MongDB'));

export { mongoose };
