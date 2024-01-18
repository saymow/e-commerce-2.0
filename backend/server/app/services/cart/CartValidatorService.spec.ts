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

  it('Should throw againts invalid cart (products does not exits)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = await makeValidCart();

    invalidCart.products.push({
      id: 'non-existent',
      qty: 5,
      price: 5 * 7700
    });

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });

  it('Should throw againts invalid cart (products sum != subtotal)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = await makeValidCart();

    invalidCart.subtotal = 10e6;
    invalidCart.total = invalidCart.subtotal + invalidCart.shippingCost;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });
});
