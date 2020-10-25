import express from 'express';
import 'express-async-errors';
import './database';
import { errorHandler, routeNotFound } from './middlewares/errorMiddleware';

import routes from './routes';

const app = express();

app.use(express.json());

app.use('/api', routes);
app.use(routeNotFound);
app.use(errorHandler);

export default app;
