import AddressController from '../../controllers/addressController';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { Router } from 'express';

const addressController = new AddressController();

const routes = Router();

routes.post('/', authMiddleware, addressController.create);
routes.get('/', authMiddleware, addressController.index);
routes.get('/:id', authMiddleware, addressController.show);
routes.put('/:id', authMiddleware, addressController.update);
routes.delete('/:id', authMiddleware, addressController.destory);

export default routes;
