import { PaymentRefundFactory } from './PaymentRefundFactory';
import PaypalRefundService from './PaypalRefundService';

describe('PaymentRefundFactory', () => {
  it('Should return paypalRefundService when service=paypal', async () => {
    const paymentRefundFactory = new PaymentRefundFactory();

    expect(await paymentRefundFactory.execute('paypal')).toBeInstanceOf(
      PaypalRefundService
    );
  });
});
