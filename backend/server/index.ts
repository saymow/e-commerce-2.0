import path from 'path';
import express from 'express';
import session from 'express-session';
import ConnectRedis from 'connect-redis';
import cors from 'cors';
import 'express-async-errors';
import 'module-alias/register';

import redis from './app/config/redis';
import './app/database';
import { errorHandler, routeNotFound } from './app/middlewares/errorMiddleware';

import routes from './app/routes';
import {
  COOKIE_NAME,
  COOKIE_SECRET,
  WEB_VIEW_URL,
  __prod__,
} from './app/constants';

const app = express();
const redisStore = ConnectRedis(session);
const uploadsPath = path.resolve(__dirname, '..', 'uploads');

app.use(
  cors({
    origin: WEB_VIEW_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: COOKIE_NAME,
    store: new redisStore({
      client: redis,
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
    saveUninitialized: false,
  })
);

console.log(uploadsPath);

app.use('/uploads', express.static(uploadsPath));

app.use(express.json());

app.use('/api', routes);
app.use(routeNotFound);
app.use(errorHandler);

export { redis };

export default app;
