import * as express from 'express';
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const logger = require('./logger/logger');

const user_routes = require('./routes/user');
const todo_routes = require('./routes/todo');
import { getStrategy } from './config/passport';

require('../config/config.js');
require('./db/mongoose');

const app: express.Application = express();

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('tiny', { stream: logger.stream }));
}

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use('jwt', getStrategy());
app.get('/', (req, res) => {
	res.send('Hello');
});

app.use('/api', user_routes);
app.use('/api', todo_routes);

export default app;
