import { Router } from 'express';
import UserController from '../../controllers/userController';
import { authAdmin, authMiddleware } from '../../middlewares/authMiddleware';

const userController = new UserController();

const routes = Router();

routes.post('/', userController.create);
routes.put('/', authMiddleware, userController.update);
routes.get('/:id', authMiddleware, userController.show);
routes.delete('/', userController.destroy);

export default routes;
