import {
  fakeInitialCheckout,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '@__tests__/fixtures';
import CartManager from './CheckoutCartManager';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(async () => {
  await tearEnvironment();
});

describe('Checkout: CheckoutInitalCartManager validation tests', () => {
  it('Should correctly validate an inital cart', async () => {
    expect(CartManager.create(fakeInitialCheckout)).rejects.not.toBeTruthy();
  });

  it('Should not validate an invalid inital cart (total price error)', async () => {
    const invalidInitialCheckout = {
      ...fakeInitialCheckout,
      total: 2000,
      subtotal: 6000,
      shippingCost: 2000,
    };

    expect(CartManager.create(invalidInitialCheckout)).rejects.toBeTruthy();
  });

  it('Should not validate an invalid inital cart (product price error)', async () => {
    const invalidInitialCheckout = {
      ...fakeInitialCheckout,
      products: [{ ...fakeInitialCheckout.products[0], price: 33 }],
      subtotal: 33,
      total: 33 + fakeInitialCheckout.shippingCost,
    };

    expect(CartManager.create(invalidInitialCheckout)).rejects.toBeTruthy();
  });
});
