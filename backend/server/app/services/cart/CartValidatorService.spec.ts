import { Cart } from '@services/checkout/CheckoutService';
import CartValidatorService from './CartValidatorService';

const makeValidCart = (): Cart => {
  return {
    products: [
      {
        id: '0a4054bb-0450-4ee0-a581-b957dba0dd8c',
        qty: 2,
      },
      {
        id: '3ced88cc-7d03-43fc-88d9-ac411f368e8a',
        qty: 2,
      },
      {
        id: '2386c796-f7fd-4f57-b21d-e0ad7b785a79',
        qty: 1,
      },
    ],
    shipmentMethod: {
      code: 'express',
      name: 'Express',
      value: 2000,
      deadline: '5',
      postalCode: '13560-560',
    },
    total: 232995,
    subtotal: 230995,
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
    const validCart = makeValidCart();

    await expect(cardValidatorService.execute(validCart)).resolves.not.toThrow()
  });

  it('Should throw againts invalid cart (invalid product qty)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = makeValidCart();

    invalidCart.products[0].qty = -1;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });

  it('Should throw againts invalid cart (subtotal + shippingCost != total)', async () => {
    const cardValidatorService = new CartValidatorService();
    const invalidCart = makeValidCart();

    invalidCart.subtotal = 1;
    invalidCart.shippingCost = 2;
    invalidCart.total = 55;

    await expect(cardValidatorService.execute(invalidCart)).rejects.toThrow();
  });
});
