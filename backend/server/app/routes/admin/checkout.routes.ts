import { AdminCheckoutController } from '../../controllers/checkoutController';
import { Router } from 'express';

const router = Router();
const checkoutController = new AdminCheckoutController();

router.get('/list', checkoutController.listAllOrders);

export default router;
