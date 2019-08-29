const app = require('./app');
const logger = require('./logger/logger');
const port = process.env.PORT || 3000;

app.listen(port, () => {
	logger.info(`Server is up on port ${port}`);
});
