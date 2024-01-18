import CreateOrderService, { OrderPayload } from './CreateOrderService';
import { Cart } from '@services/checkout/CheckoutService';
import {
  fakeUser,
  setupEnvironment,
  setupFakeProducts,
  setupFakeUsers,
  tearEnvironment,
} from '@__tests__/fixtures';
import { In, getConnection, getRepository } from 'typeorm';
import Product from '../../models/Product';
import { v4 } from 'uuid';
import User from '../../models/User';
import Order, { OrderState } from '../../models/Order';
import OrderAddress from '../../models/OrderAddress';
import OrderProduct from '../../models/OrderProduct';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeUsers();
  await setupFakeProducts();
});

beforeEach(async () => {
  const connection = getConnection();

  await connection.query('DELETE FROM orders_address;');
  await connection.query('DELETE FROM orders_products;');
  await connection.query('DELETE FROM orders;');
});

afterAll(tearEnvironment);

const makeCartValidatorStub = () => {
  class CartValidatorService {
    async execute(cart: Cart) {
      return Promise.resolve();
    }
  }

  return new CartValidatorService();
};

const makePaymentRefundFactoryStub = () => {
  class PaymentRefundFactoryStub {
    async execute(paymentMethod: string) {
      return {
        execute: async (paymentId: string) => {},
      };
    }
  }

  return new PaymentRefundFactoryStub();
};

const makeSut = () => {
  const cartValidatorStub = makeCartValidatorStub();
  const paymentRefundFactoryStub = makePaymentRefundFactoryStub();
  const sut = new CreateOrderService(
    cartValidatorStub,
    paymentRefundFactoryStub
  );

  return { sut, cartValidatorStub, paymentRefundFactoryStub };
};

const makeValidCart = async (): Promise<Cart> => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();
  const cartProducts = products.map((product, idx) => ({
    id: product.id,
    qty: idx + 1,
    price: product.price,
  }));
  const cartProductsTotal = cartProducts.reduce(
    (acc, product) => acc + product.price * product.qty,
    0
  );

  return {
    products: cartProducts,
    shipmentMethod: {
      code: 'express',
      name: 'Express',
      value: 2000,
      deadline: '5',
      postalCode: '13560-560',
    },
    total: cartProductsTotal + 2000,
    subtotal: cartProductsTotal,
    shippingCost: 2000,
    shipmentAddress: {
      state: 'SP',
      city: 'São Carlos',
      neighborhood: 'Jardim Lutfalla',
      postal_code: '13560-560',
      street: 'Rua Nove de Julho, apto 14',
      number: 2790,
    },
  };
};

const makeOrderPayload = async (): Promise<OrderPayload> => {
  const user = await getRepository(User).findOne({ email: fakeUser.email });

  return {
    userId: user!.id,
    checkoutId: v4(),
    paymentId: 'payment-id',
    paymentSource: 'payment-source',
    cart: await makeValidCart(),
  };
};

describe('CreateOrderService', () => {
  it('Should call CartValidator with correct values', async () => {
    const orderPayload = await makeOrderPayload();
    const { sut, cartValidatorStub } = makeSut();

    const cartValidatorServiceSpy = jest.spyOn(cartValidatorStub, 'execute');

    await sut.execute(orderPayload);

    expect(cartValidatorServiceSpy).toHaveBeenCalledWith(orderPayload.cart);
  });

  it('Should throw if CartValidator throws', async () => {
    const orderPayload = await makeOrderPayload();
    const { sut, cartValidatorStub } = makeSut();

    jest.spyOn(cartValidatorStub, 'execute').mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.execute(orderPayload)).rejects.toThrow();
  });

  it('Should craete an order on success', async () => {
    const { sut } = makeSut();
    const orderRepository = getRepository(Order);
    const orderPayload = await makeOrderPayload();
    const cartValidatorService = makeCartValidatorStub();

    await expect(sut.execute(orderPayload)).resolves.not.toThrow();

    const order = await orderRepository.findOne(orderPayload.checkoutId);

    expect(order).toBeDefined();
    expect(order?.user_id).toBe(orderPayload.userId);
    expect(order?.products.length).toBe(orderPayload.cart.products.length);
    expect(order?.total).toBe(orderPayload.cart.total);
    expect(order?.subtototal).toBe(orderPayload.cart.subtotal);
    expect(order?.shipment_cost).toBe(orderPayload.cart.shippingCost);
    expect(order?.state).toBe(OrderState.IN_PROGRESS);
    expect(order?.payment_id).toBe(orderPayload.paymentId);
    expect(order?.address.state).toBe(orderPayload.cart.shipmentAddress.state);
    expect(order?.address.city).toBe(orderPayload.cart.shipmentAddress.city);
    expect(order?.address.neighborhood).toBe(
      orderPayload.cart.shipmentAddress.neighborhood
    );
    expect(order?.address.street).toBe(
      orderPayload.cart.shipmentAddress.street
    );
    expect(order?.address.postal_code).toBe(
      orderPayload.cart.shipmentAddress.postal_code
    );
    expect(order?.address.number).toBe(
      orderPayload.cart.shipmentAddress.number
    );

    const sortedPayloadProducts = orderPayload.cart.products.sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    const sortedOrderProducts = order!.products.sort((a, b) =>
      a.product_id.localeCompare(b.product_id)
    );

    sortedPayloadProducts.forEach((payloadProduct, idx) => {
      const product = sortedOrderProducts[idx];

      expect(product).toBeDefined();
      expect(product.unit_price).toEqual(payloadProduct.price);
      expect(product.qty).toEqual(payloadProduct.qty);
    });
  });

  it('Should discount products in_stock property', async () => {
    const { sut } = makeSut();
    const productsRepository = getRepository(Product);
    const orderPayload = await makeOrderPayload();
    const productsDesiredStockAfterOrder = await Promise.all(
      orderPayload.cart.products.map(async cartProduct => {
        const product = await productsRepository.findOne(cartProduct.id);

        return {
          productId: product!.id,
          count_in_stock: product!.count_in_stock - cartProduct.qty,
        };
      })
    );

    await expect(sut.execute(orderPayload)).resolves.not.toThrow();

    const products = await productsRepository.find({
      where: {
        id: In(productsDesiredStockAfterOrder.map(item => item.productId)),
      },
    });

    const sortedProductsDesiredStockAfterOrder = productsDesiredStockAfterOrder.sort(
      (a, b) => a.productId.localeCompare(b.productId)
    );
    const sortedProducts = products.sort((a, b) => a.id.localeCompare(b.id));

    sortedProductsDesiredStockAfterOrder.forEach(
      (productsDesiredStock, idx) => {
        const orderProduct = sortedProducts[idx];

        expect(productsDesiredStock.productId).toBe(orderProduct.id);
        expect(productsDesiredStock.count_in_stock).toBe(
          orderProduct.count_in_stock
        );
      }
    );
  });

  it('Should call PaymentRefundFactory with correct paymentMethod if order is not created', async () => {
    const { sut, paymentRefundFactoryStub } = makeSut();
    const orderPayload = await makeOrderPayload();

    orderPayload.cart.total = -1;

    const paymentRefundFactorySpy = jest.spyOn(
      paymentRefundFactoryStub,
      'execute'
    );

    try {
      await sut.execute(orderPayload);
    } catch {}

    expect(paymentRefundFactorySpy).toBeCalledWith(orderPayload.paymentSource);
  });
});
