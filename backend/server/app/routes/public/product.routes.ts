import { Router } from 'express';

import ProductsController from '../../controllers/productController';

const productsController = new ProductsController();
const router = Router();

router.get('/', productsController.index);
router.get('/count', productsController.indexCount);
router.get('/top', productsController.topRated);
router.get('/:id', productsController.show);

export default router;
