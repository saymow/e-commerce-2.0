import CheckoutService from '../services/checkout/CheckoutService';
import { Request, Response } from 'express';

class CheckoutController {
  async show(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;

    const checkoutManager = await CheckoutService.connect(userId, checkoutId);

    return res.send({ cart: checkoutManager.cart });
  }

  async create(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const cart = req.body;

    const checkoutManager = new CheckoutService(cart, userId);
    await checkoutManager.save();

    return res.status(201).send({ id: checkoutManager.serviceIdetenfier });
  }

  // Usually, called to attach address to checkout
  async update(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;
    const cart = req.body;

    const checkoutService = await CheckoutService.connect(userId, checkoutId);
    checkoutService.cart = cart;
    await checkoutService.save();

    return res.sendStatus(200);
  }

  async store(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const checkoutId = req.params.checkoutId;
    const { paymentId, paymentSource } = req.body;
    const cart = (await CheckoutService.connect(userId, checkoutId)).cart;

    console.log(
      JSON.stringify(
        { userId, checkoutId, cart, paymentId, paymentSource },
        null,
        2
      )
    );

    return res.sendStatus(201);
  }
}

export default CheckoutController;
