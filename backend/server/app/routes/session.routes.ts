import { Router } from 'express';

import SessionController from '../controllers/sessionController';
import { authMiddleware } from '../middlewares/authMiddleware';

const sessionController = new SessionController();
const routes = Router();

routes.post('/', sessionController.login);
routes.get('/', authMiddleware, sessionController.logout);

routes.post('/forgot-password/:email', sessionController.forgotPassword);
routes.post('/change-password/:token', sessionController.changePassword);

export default routes;
