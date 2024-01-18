import { PaymentConfirmation } from './PaymentConfirmationFactory';

class PaypalPaymentConfirmationService implements PaymentConfirmation {
  async execute(paymentId: string) {}
}

export default PaypalPaymentConfirmationService;
