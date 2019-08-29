const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const logger = require('./logger/logger');

const user_routes = require('./routes/user');
const todo_routes = require('./routes/todo');

const publicPath = path.join(__dirname, '../public');

require('./config/config.js');
require('./db/mongoose');

const app = express();

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('tiny', { stream: logger.stream }));
}

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(publicPath));
app.use(passport.initialize());
require('./config/passport')(passport);
app.get('/', (req, res) => {
	res.send('Hello');
});

app.use('/api', user_routes);
app.use('/api', todo_routes);

module.exports = app;
