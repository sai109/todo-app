import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as morgan from 'morgan';
import { stream } from './logger/logger';

import user_routes from './routes/user';
import todo_routes from './routes/todo';
import { getStrategy } from './config/passport';

import '../config/config.js';
import './db/mongoose';

const app: express.Application = express();

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('tiny', { stream }));
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
