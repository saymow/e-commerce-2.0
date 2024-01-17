import CheckoutManager from '../classes/CheckoutManager';
import { Request, Response } from 'express';

class CheckoutController {
  async show(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;

    const checkoutService = await CheckoutManager.connect(userId, checkoutId);

    return res.send({ cart: checkoutService.cartData });
  }

  async create(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const CartData = req.body;

    const checkoutService = await CheckoutManager.connect(userId);
    await checkoutService.bindInitialCheckoutData(CartData);
    const serviceIdentifier = checkoutService.serviceIdetenfier;

    return res.status(201).send({ id: serviceIdentifier });
  }

  // Usually, called to attach address to checkout
  async update(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;
    const CartData = req.body;

    const checkoutService = await CheckoutManager.connect(userId, checkoutId);
    await checkoutService.bindFullCheckoutData(CartData);

    return res.sendStatus(200);
  }

  async store(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;
    const { paymentId, paymentSource } = req.body;
    const cart = (await CheckoutManager.connect(userId, checkoutId)).cartData;

    console.log({ userId, checkoutId, cart, paymentId, paymentSource });

    return res.sendStatus(201);
  }
}

export default CheckoutController;
