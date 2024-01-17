import { Cart } from '@services/checkout/CheckoutService';
import CartValidatorService from './CartValidatorService';
import {
  setupEnvironment,
  setupFakeProducts,
  tearEnvironment,
} from '@__tests__/fixtures';
import { getRepository } from 'typeorm';
import Product from '../../models/Product';
import AppError from '../../errors/AppError';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeProducts();
});

afterAll(tearEnvironment);

const makeValidCart = async (): Promise<Cart> => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();
  const total = products.reduce((acc, next, idx) => {
    return acc + next.price * (idx + 1);
  }, 0);

  return {
    products: products.map((product, idx) => ({
      id: product.id,
      qty: idx + 1,
    })),
    shipmentMethod: {
      code: 'express',
      name: 'Express',
      value: 2000,
      deadline: '5',
      postalCode: '13560-560',
    },
    total: total,
    subtotal: total - 2000,
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

describe('CartValidatorService', () => {
  it('Should not throw againts valid cart', async () => {
    const cardValidatorService = new CartValidatorService();
    const validCart = await makeValidCart();

    await expect(
      cardValidatorService.execute(validCart)
    ).resolves.not.toThrow();
  });

  it('Should throw againts invalid cart (invalid product qty)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = await makeValidCart();

    invalidCart.products[0].qty = -1;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });

  it('Should throw againts invalid cart (subtotal + shippingCost != total)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = await makeValidCart();

    invalidCart.subtotal = 1;
    invalidCart.shippingCost = 2;
    invalidCart.total = 55;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });

  it('Should throw againts invalid cart (products out of stock)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = await makeValidCart();

    invalidCart.products[0].qty = 999999999999999;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });
});
