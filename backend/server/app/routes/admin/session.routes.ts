import { Router } from 'express';

import { AdminSessionController } from '../../controllers/sessionController';

const adminSessionController = new AdminSessionController();
const routes = Router();

routes.post('/', adminSessionController.login);
routes.post('/me', adminSessionController.status);

export default routes;
