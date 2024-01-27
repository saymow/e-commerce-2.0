import BullBoard from 'bull-board';
import { Router } from 'express';
import Queues from '../../lib/Queue';

import { authAdmin, authMiddleware } from '../../middlewares/authMiddleware';
import checkoutRoutes from './checkout.routes';
import productRoutes from './product.routes';
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';

BullBoard.setQueues(Queues.queues.map(queue => queue.bull));

const routes = Router();

routes.use('/queues', authMiddleware, authAdmin, BullBoard.UI);
routes.use('/products', authMiddleware, authAdmin, productRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/users', authMiddleware, authAdmin, userRoutes);
routes.use('/checkout', authMiddleware, authAdmin, checkoutRoutes);

export default routes;
