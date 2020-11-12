import { Router } from 'express';

import { authMiddleware, authAdmin } from '../../middlewares/authMiddleware';
import { AdminSessionController } from '../../controllers/sessionController';

const adminSessionController = new AdminSessionController();
const routes = Router();

routes.post('/', adminSessionController.login);
routes.post('/me', authMiddleware, authAdmin, adminSessionController.status);

export default routes;
