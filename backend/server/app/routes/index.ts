import { Router } from 'express';

import publicRoutes from './public';
import adminRoutes from './admin';

const routes = Router();

routes.use('/admin', adminRoutes);
routes.use('/', publicRoutes);

export default routes;
