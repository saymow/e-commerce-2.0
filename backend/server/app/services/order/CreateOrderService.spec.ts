import CartValidatorService from '@services/cart/CartValidatorService';
import CreateOrderService, { OrderPayload } from './CreateOrderService';
import { Cart } from '@services/checkout/CheckoutService';
import {
  setupEnvironment,
  setupFakeProducts,
  tearEnvironment,
} from '@__tests__/fixtures';
import { getRepository } from 'typeorm';
import Product from '../../models/Product';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeProducts();
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
  return {
    userId: 'user-id',
    checkoutId: 'checkout-id',
    paymentId: 'payment-id',
    paymentSource: 'payment-source',
    cart: await makeValidCart(),
  };
};

describe('CreateOrderService', () => {
  it('Should call CartValidator with correct values', async () => {
    const orderPayload = await makeOrderPayload();
    const cartValidatorService = makeCartValidatorStub();

    const cartValidatorServiceSpy = jest.spyOn(cartValidatorService, 'execute');

    const createOrderService = new CreateOrderService(cartValidatorService);

    await createOrderService.execute(orderPayload);

    expect(cartValidatorServiceSpy).toHaveBeenCalledWith(orderPayload.cart);
  });

  it('Should throw if CartValidator throws', async () => {
    const orderPayload = await makeOrderPayload();
    const cartValidatorService = makeCartValidatorStub();

    jest.spyOn(cartValidatorService, 'execute').mockImplementation(() => {
      throw new Error();
    });

    const createOrderService = new CreateOrderService(cartValidatorService);

    await expect(createOrderService.execute(orderPayload)).rejects.toThrow();
  });
});
