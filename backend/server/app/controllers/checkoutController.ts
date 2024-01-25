import CreateOrderService from '@services/order/CreateOrderService';
import CheckoutService, { Cart } from '../services/checkout/CheckoutService';
import { Request, Response } from 'express';
import CartValidatorService from '@services/cart/CartValidatorService';
import { PaymentRefundFactory } from '@services/payment/PaymentRefundFactory';
import { PaymentConfirmationFactory } from '@services/payment/PaymentConfirmationFactory';
import ListOrdersService from '@services/order/ListOrdersService';
import order_view from '../views/api/order_view';

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
    const createOrderService = new CreateOrderService(
      new CartValidatorService(),
      new PaymentConfirmationFactory(),
      new PaymentRefundFactory()
    );
    const checkoutService = await CheckoutService.connect(userId, checkoutId);
    const cart = checkoutService.cart as Cart;

    await createOrderService.execute({
      userId,
      checkoutId,
      cart,
      paymentId,
      paymentSource,
    });
    await checkoutService.evict();

    return res.sendStatus(201);
  }

  async listOrders(req: Request, res: Response) {
    const userId = req.session!.user.id;
    const listUsersService = new ListOrdersService();
    const orders = await listUsersService.execute(userId);

    return res.send(order_view.renderMany(orders));
  }
}

export default CheckoutController;
