import CartValidatorService from '@services/cart/CartValidatorService';
import { Cart } from '@services/checkout/CheckoutService';
import Order, { OrderState } from '../../models/Order';
import { getConnection, getRepository } from 'typeorm';
import OrderProduct from '../../models/OrderProduct';
import OrderAddress from '../../models/OrderAddress';
import { addDays } from '../../utils/date';

export interface OrderPayload {
  cart: Cart;
  userId: string;
  checkoutId: string;
  paymentId: string;
  paymentSource: string;
}

class CreateOrderService {
  constructor(private readonly cartValidatorService: CartValidatorService) {}

  async execute(orderPayload: OrderPayload) {
    const { userId, checkoutId, paymentId, paymentSource, cart } = orderPayload;
    const { shipmentMethod, shipmentAddress, products } = cart;

    const orderRepository = getRepository(Order);
    const orderProductsRepository = getRepository(OrderProduct);
    const orderAddressRepository = getRepository(OrderAddress);

    await this.cartValidatorService.execute(cart);

    await getConnection().transaction(async transactionEntityManager => {
      const order = orderRepository.create({
        id: checkoutId,
        user_id: userId,
        payment_id: paymentId,
        payment_source: paymentSource,
        state: OrderState.IN_PROGRESS,
        shipment_code: shipmentMethod.code,
        shipment_cost: shipmentMethod.value,
        shipment_deadline: addDays(
          new Date(),
          parseInt(shipmentMethod.deadline)
        ),
        subtototal: cart.subtotal,
        total: cart.total,
      });
      const orderAddress = orderAddressRepository.create({
        order_id: order.id,
        state: shipmentAddress.state,
        city: shipmentAddress.city,
        neighborhood: shipmentAddress.neighborhood,
        street: shipmentAddress.street,
        postal_code: shipmentAddress.postal_code,
        number: shipmentAddress.number,
      });
      const orderProducts = products.map(product => {
        return orderProductsRepository.create({
          order_id: order.id,
          product_id: product.id,
          qty: product.qty,
          unit_price: product.price,
        });
      });

      await transactionEntityManager.save(order);
      await Promise.all(
        orderProducts.map(item => transactionEntityManager.save(item))
      );
      await transactionEntityManager.save(orderAddress);
    });
  }
}

export default CreateOrderService;
