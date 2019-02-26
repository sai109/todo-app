const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	logger.error(`Server is up on port ${port}`);
});
