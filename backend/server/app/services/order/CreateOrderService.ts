import CartValidatorService from '@services/cart/CartValidatorService';
import { Cart } from '@services/checkout/CheckoutService';
import Order, { OrderState } from '../../models/Order';
import { EntityManager, In, getConnection, getRepository } from 'typeorm';
import OrderProduct from '../../models/OrderProduct';
import OrderAddress from '../../models/OrderAddress';
import { addDays } from '../../utils/date';
import Product from '../../models/Product';
import AppError from '../../errors/AppError';
import { PaymentRefundFactory } from '@services/payment/PaymentRefundFactory';
import { PaymentConfirmationFactory } from '@services/payment/PaymentConfirmationFactory';

export interface OrderPayload {
  cart: Cart;
  userId: string;
  checkoutId: string;
  paymentId: string;
  paymentSource: string;
}

class CreateOrderService {
  constructor(
    private readonly cartValidatorService: CartValidatorService,
    private readonly paymentConfirmationFactory: PaymentConfirmationFactory,
    private readonly paymentRefundFactory: PaymentRefundFactory
  ) {}

  async execute(orderPayload: OrderPayload) {
    try {
      const {
        userId,
        checkoutId,
        paymentId,
        paymentSource,
        cart,
      } = orderPayload;
      const { shipmentMethod, shipmentAddress, products } = cart;

      const orderRepository = getRepository(Order);
      const orderProductsRepository = getRepository(OrderProduct);
      const orderAddressRepository = getRepository(OrderAddress);
      const paymentConfirmation = await this.paymentConfirmationFactory.execute(
        paymentSource
      );

      await this.cartValidatorService.execute(cart);
      await paymentConfirmation.execute(orderPayload.paymentId);

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
        await transactionEntityManager
          .createQueryBuilder(Product, 'product')
          .setLock('pessimistic_write')
          .where({ id: In(orderProducts.map(item => item.product_id)) })
          .getMany()
          .then(async products => {
            for (const product of products) {
              const orderProduct = orderProducts.find(
                item => item.product_id === product.id
              );

              if (orderProduct!.qty > product.count_in_stock)
                throw new AppError(`Product ${product?.name} is out of stock`);

              product.count_in_stock -= orderProduct!.qty;
              await transactionEntityManager.save(product);
            }
          });
      });
    } catch (err) {
      console.error('Order creation failed: ', err);
      const paymentRefundService = await this.paymentRefundFactory.execute(
        orderPayload.paymentSource
      );

      await paymentRefundService.execute(orderPayload.paymentId);

      throw err;
    }
  }
}

export default CreateOrderService;
