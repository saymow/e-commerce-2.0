import { AdminCheckoutController } from '../../controllers/checkoutController';
import { Router } from 'express';

const router = Router();
const checkoutController = new AdminCheckoutController();

router.get('/list', checkoutController.listAllOrders);
router.get('/:id', checkoutController.showOrder);

export default router;
