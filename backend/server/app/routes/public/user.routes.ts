import { Router } from 'express';
import UserController from '../../controllers/userController';
import { authAdmin, authMiddleware } from '../../middlewares/authMiddleware';

const userController = new UserController();

const routes = Router();

routes.post('/', userController.create);
routes.put('/', authMiddleware, userController.update);
routes.get('/', authMiddleware, userController.show);
routes.post('/confirm', authMiddleware, userController.sendConfirmation);
routes.get('/confirm/:token', userController.confirm);
routes.delete('/', userController.destroy);

export default routes;
