import { Router } from 'express';

import upload from '../../config/uploads/internal/productImageUpload';
import { AdminProductController } from '../../controllers/productController';

const adminProductController = new AdminProductController();
const router = Router();

router.get('/', adminProductController.index);
router.get('/count', adminProductController.indexCount);
router.get('/:id', adminProductController.show);
router.get('/top', adminProductController.topRated);
router.post('/', upload.multer.single('image'), adminProductController.create);
router.put('/:id', adminProductController.update);
router.delete('/:id', adminProductController.destroy);

export default router;
