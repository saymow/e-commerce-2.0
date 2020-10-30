import { Router } from 'express';
import UserController from '../controllers/userController';

const userController = new UserController();

const routes = Router();

routes.post('/', userController.create);
routes.put('/', userController.update);
routes.delete('/', userController.destroy);

//Admin Only
routes.get('/', userController.index);
//Admin Only
routes.get('/:id', userController.show);

export default routes;
