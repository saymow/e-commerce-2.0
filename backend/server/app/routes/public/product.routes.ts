import { Router } from 'express';

import upload from '../../config/uploads/internal/productImageUpload';
import ProductsController from '../../controllers/productController';

const productsController = new ProductsController();
const router = Router();

router.get('/', productsController.index);
router.get('/:id', productsController.show);

export default router;
