import AppError from '../../errors/AppError';
import PaypalPaymentConfirmationService from './PaypalPaymentConfirmationService';

export interface PaymentConfirmation {
  execute(paymentId: string): Promise<void>;
}

export class PaymentConfirmationFactory {
  async execute(paymentMethod: string) {
    // Some paypal logic would be inject here
    if (paymentMethod === 'paypal') return new PaypalPaymentConfirmationService();

    throw new AppError(`Unknown payment service provided ${paymentMethod}`);
  }
}
