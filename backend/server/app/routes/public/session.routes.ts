import { Router } from 'express';

import SessionController from '../../controllers/sessionController';
import { authMiddleware, authAdmin } from '../../middlewares/authMiddleware';

const sessionController = new SessionController();
const routes = Router();

routes.post('/', sessionController.login);
routes.post('/me', authMiddleware, sessionController.status);
routes.post('/logout', authMiddleware, sessionController.logout);

routes.post('/forgot-password/:email', sessionController.forgotPassword);
routes.post('/change-password/:token', sessionController.changePassword);

export default routes;
