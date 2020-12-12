import { Router } from 'express';

import productRoutes from './product.routes';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import addressRoutes from './address.routes';
import cacheShipmentRoutes from './checkout/shipment.routes';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/addresses', addressRoutes);

routes.use('/checkout', cacheShipmentRoutes);

export default routes;
