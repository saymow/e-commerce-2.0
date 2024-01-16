import CheckoutManager from '../classes/CheckoutManager';
import { Request, Response } from 'express';

class CheckoutController {
  async create(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const CartData = req.body;

    const checkoutService = await CheckoutManager.connect(userId);
    await checkoutService.bindInitialCheckoutData(CartData);
    const serviceIdentifier = checkoutService.serviceIdetenfier;

    return res.status(201).send({ id: serviceIdentifier });
  }

  async show(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const serviceId = req.params.serviceId;

    const checkoutService = await CheckoutManager.connect(userId, serviceId);

    let cart = checkoutService.cartData;

    return res.send({ cart });
  }

  async store(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const serviceId = req.params.serviceId;
    const CartData = req.body;

    const checkoutService = await CheckoutManager.connect(userId, serviceId);
    await checkoutService.bindFullCheckoutData(CartData);

    return res.sendStatus(200);
  }
}

export default CheckoutController;
