import { Router } from 'express';
import UserController from '../../controllers/userController';
import { authAdmin, authMiddleware } from '../../middlewares/authMiddleware';

const userController = new UserController();

const routes = Router();

routes.post('/', userController.create);
routes.put('/', authMiddleware, userController.update);
routes.get('/', authMiddleware, userController.show);
routes.post('/confirm', authMiddleware, userController.sendConfirmation);
routes.delete('/', userController.destroy);

routes.get('/confirm/:token', userController.confirm);
routes.get('/confirm-email/:token', userController.cofirmNewEmail);

export default routes;
