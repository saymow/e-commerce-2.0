import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import CheckoutController from '../../controllers/checkoutController';

const router = Router();
const checkoutController = new CheckoutController();

router.post('/', authMiddleware, checkoutController.create);
router.get('/:serviceId', authMiddleware, checkoutController.show);
router.post('/:serviceId', authMiddleware, checkoutController.store);

export default router;
