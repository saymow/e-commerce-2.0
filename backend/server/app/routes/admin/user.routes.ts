import { Router } from 'express';
import { AdminUserController } from '../../controllers/userController';

const adminController = new AdminUserController();

const routes = Router();

routes.post('/', adminController.create);
routes.delete('/', adminController.destroy);
routes.get('/', adminController.index);
routes.get('/:id', adminController.show);

export default routes;
