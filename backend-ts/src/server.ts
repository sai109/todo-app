import app from './app';
const logger = require('./logger/logger');

const port = process.env.PORT || 3000;
console.log('PORT: ', port);

app.listen(port, () => {
	logger.info(`Server is up on port ${port}`);
});
