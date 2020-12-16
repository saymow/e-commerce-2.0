import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import CheckoutController from '../../controllers/checkoutController';

const router = Router();
const checkoutController = new CheckoutController();

router.post('/', authMiddleware, checkoutController.store);
router.get('/:serviceId', checkoutController.show);

export default router;
