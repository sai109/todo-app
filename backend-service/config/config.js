const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV;
if (env === 'development') {
	dotenv.config({ path: path.resolve(__dirname, './dev.env') });
}
if (env === 'test') {
	dotenv.config({ path: path.resolve(__dirname, './test.env') });
}
