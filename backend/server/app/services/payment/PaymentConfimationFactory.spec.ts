import { PaymentConfirmationFactory } from './PaymentConfirmationFactory';
import { PaymentRefundFactory } from './PaymentRefundFactory';
import PaypalPaymentConfirmationService from './PaypalPaymentConfirmationService';

describe('PaymentRefundFactory', () => {
  it('Should return paypalRefundService when service=paypal', async () => {
    const paymentRefundFactory = new PaymentConfirmationFactory();

    expect(await paymentRefundFactory.execute('paypal')).toBeInstanceOf(
      PaypalPaymentConfirmationService
    );
  });

  it('Should throw an error if unknown service is provided', async () => {
    const paymentRefundFactory = new PaymentConfirmationFactory();

    await expect(paymentRefundFactory.execute('unknown')).rejects.toThrow();
  });
});
