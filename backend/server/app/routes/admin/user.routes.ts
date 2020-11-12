import { Router } from 'express';
import { AdminUserController } from '../../controllers/userController';

const adminController = new AdminUserController();

const routes = Router();

routes.post('/', adminController.create);
routes.delete('/:id', adminController.destroy);
routes.get('/', adminController.index);
routes.put('/:id', adminController.update);
routes.get('/:id', adminController.show);
routes.post('/confirm/:id', adminController.confirm);
routes.post('/admin/:id', adminController.setAdmin);

export default routes;
