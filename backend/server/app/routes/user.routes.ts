import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import { authAdmin, authMiddleware } from '../middlewares/authMiddleware';

const userController = new UserController();

const routes = Router();

routes.post('/', userController.create);
routes.put('/', authMiddleware, userController.update);
routes.delete('/', authMiddleware, userController.destroy);

//Admin Only
routes.get('/', authMiddleware, authAdmin, userController.index);
//Admin Only
routes.get('/:id', authMiddleware, authAdmin, userController.show);

export default routes;
