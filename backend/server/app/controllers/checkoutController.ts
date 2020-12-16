import CheckoutManager from '../classes/CheckoutManager';
import { Request, Response } from 'express';

class CheckoutController {
  async store(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const CartData = req.body;

    const checkoutService = await CheckoutManager.connect(userId);
    await checkoutService.subscribeInitialCheckoutData(CartData);
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
}

export default CheckoutController;
