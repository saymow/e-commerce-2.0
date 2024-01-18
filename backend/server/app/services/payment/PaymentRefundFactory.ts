import PaypalRefundService from "./PaypalRefundService"

export interface PaymentRefund {
  execute(paymentId: string): Promise<void> 
}

export class PaymentRefundFactory {
  async execute(paymentMethod: string) {
    // Some paypal logic would be inject here
    if (paymentMethod === 'paypal') return new PaypalRefundService()
  }
}