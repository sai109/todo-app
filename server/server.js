const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const user_routes = require('./routes/user');
const todo_routes = require('./routes/todo');
const passport = require('passport');
const morgan = require('morgan');
const logger = require('../logger/logger');
const path = require('path');

const publicPath = path.join(__dirname, '../public');

require('./config/config.js');
require('./db/mongoose');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

app.use(express.static(publicPath));
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api', user_routes);
app.use('/api', todo_routes);

app.post('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	logger.error(`Server is up on port ${port}`);
});

module.exports = { app };
