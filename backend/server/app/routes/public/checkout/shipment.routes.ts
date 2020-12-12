import CreateShipmentDataService from '../../../services/cache/CreateShipmentDataService';
import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/authMiddleware';
import CheckoutManagerService from '../../../services/checkout/CheckoutManagerService';

const router = Router();

router.post('/shipment', authMiddleware, async (req, res) => {
  const userId = req.session!.user;
  const shipmentMethodData = req.body;

  const checkoutService = await CheckoutManagerService.connect(userId);
  await checkoutService.subscribeShipmentMethod(shipmentMethodData);
  const serviceIdentifier = checkoutService.serviceIdetenfier;

  return res.status(201).send({ service: serviceIdentifier });
});

router.get('/:serviceId/shipment', authMiddleware, async (req, res) => {
  const userId = req.session!.user;
  const serviceId = req.params.serviceId;

  const checkoutService = await CheckoutManagerService.connect(
    userId,
    serviceId
  );

  let shipmentMethod = checkoutService.shipmentMethodData;

  return res.send({ shipmentMethod });
});

export default router;
