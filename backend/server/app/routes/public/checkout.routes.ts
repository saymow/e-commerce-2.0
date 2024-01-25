import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import CheckoutController from '../../controllers/checkoutController';

const router = Router();
const checkoutController = new CheckoutController();

router.post('/', authMiddleware, checkoutController.create);
router.get('/list', authMiddleware, checkoutController.listOrders);
router.get('/:checkoutId', authMiddleware, checkoutController.show);
router.put('/:checkoutId', authMiddleware, checkoutController.update);
router.post('/:checkoutId', authMiddleware, checkoutController.store);

export default router;
