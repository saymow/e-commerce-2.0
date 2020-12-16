import {
  fakeInitialCheckout,
  setupEnvironment,
  setupFakeData,
  tearEnvironment,
} from '@__tests__/fixtures';
import InitialCartManager from './CheckoutInitialCartManager';

beforeAll(async () => {
  await setupEnvironment();
  await setupFakeData();
});

afterAll(async () => {
  await tearEnvironment();
});

describe('Checkout: CheckoutInitalCartManager validation tests', () => {
  it('Should correctly validate an inital cart', async () => {
    expect(
      InitialCartManager.create(fakeInitialCheckout)
    ).rejects.not.toBeTruthy();
  });

  it('Should not validate an invalid inital cart (total price error)', async () => {
    const invalidInitialCheckout = {
      ...fakeInitialCheckout,
      total: 2000,
      subtotal: 6000,
      shippingCost: 2000,
    };

    expect(
      InitialCartManager.create(invalidInitialCheckout)
    ).rejects.toBeTruthy();
  });

  it('Should not validate an invalid inital cart (product price error)', async () => {
    const invalidInitialCheckout = {
      ...fakeInitialCheckout,
      products: [{ ...fakeInitialCheckout.products[0], price: 33 }],
      subtotal: 33,
      total: 33 + fakeInitialCheckout.shippingCost,
    };

    expect(
      InitialCartManager.create(invalidInitialCheckout)
    ).rejects.toBeTruthy();
  });
});
