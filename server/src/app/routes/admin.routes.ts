import BullBoard from 'bull-board';
import { Router } from 'express';

import Queues from '../lib/Queue';

BullBoard.setQueues(Queues.queues.map(queue => queue.bull));

const routes = Router();

routes.use('/queues', BullBoard.UI);

export default routes;
