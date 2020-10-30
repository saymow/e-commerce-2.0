import { Router } from 'express';

import upload from '../config/uploads/internal/productImageUpload';
import ProductsController from '../controllers/productController';

const productsController = new ProductsController();
const router = Router();

router.get('/', productsController.index);
router.get('/:id', productsController.show);
router.post('/', upload.multer.single('image'), productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.destroy);

export default router;
