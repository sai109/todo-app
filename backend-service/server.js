const app = require('./app');
const logger = require('./logger/logger');
const os = require('os');

const port = process.env.PORT || 3000;
console.log('PORT: ', port);

app.listen(port, () => {
	logger.info(`Server is up on port ${port}`);
});
