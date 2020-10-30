import express from 'express';
import session from 'express-session';
import redis from 'redis';
import ConnectRedis from 'connect-redis';
import 'express-async-errors';
import './database';
import { errorHandler, routeNotFound } from './middlewares/errorMiddleware';

import routes from './routes';
import { COOKIE_NAME, COOKIE_SECRET, __prod__ } from './constants';

const app = express();
const redisClient = redis.createClient();
const redisStore = ConnectRedis(session);

app.use(
  session({
    name: COOKIE_NAME,
    store: new redisStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      sameSite: 'lax',
      secure: __prod__,
    },
    resave: false,
    secret: COOKIE_SECRET,
  })
);

app.use(express.json());

app.use('/api', routes);
app.use(routeNotFound);
app.use(errorHandler);

export default app;
