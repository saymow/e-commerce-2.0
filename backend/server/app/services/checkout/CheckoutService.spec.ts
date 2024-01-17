import CheckoutService, { InitialCart } from './CheckoutService';

describe('CheckoutService', () => {
  it('Should create a valid checkout instance', async () => {
    const fakeCart = {} as InitialCart;
    const userId = 'userId';

    const checkoutService = new CheckoutService(fakeCart, userId);

    expect(checkoutService.cart === fakeCart);
  });

  it('Should connect with a valid checkout and retrieve data', async () => {
    const fakeCart = {} as InitialCart;
    const userId = 'userId';

    const oldCheckoutService = new CheckoutService(fakeCart, userId);
    oldCheckoutService.save();

    const checkoutService = await CheckoutService.connect(
      userId,
      oldCheckoutService.serviceIdetenfier
    );

    expect(
      JSON.stringify(oldCheckoutService.cart) ===
        JSON.stringify(checkoutService.cart)
    );
  });

  it('Should not be able to connect and retrieve someone else cart', async () => {
    const fakeCart = {} as InitialCart;
    const user1Id = 'user1Id';
    const user2Id = 'user2Id';

    const oldCheckoutService = new CheckoutService(fakeCart, user1Id);
    await oldCheckoutService.save();

    expect(
      CheckoutService.connect(
        user2Id,
        oldCheckoutService.serviceIdetenfier
      )
    ).rejects.toThrow();
  });
});
