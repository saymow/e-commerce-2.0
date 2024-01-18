import { PaymentRefund } from './PaymentRefundFactory';

class PaypalRefundService implements PaymentRefund {
  async execute(paymentId: string) {}
}

export default PaypalRefundService;
