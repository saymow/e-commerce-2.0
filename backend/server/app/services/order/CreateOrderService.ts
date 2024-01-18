import CartValidatorService from '@services/cart/CartValidatorService';
import { Cart } from '@services/checkout/CheckoutService';

export interface OrderPayload {
  cart: Cart;
  userId: string;
  checkoutId: string;
  paymentId: string;
  paymentSource: string;
}

class CreateOrderService {
  constructor(private readonly cartValidatorService: CartValidatorService) {}

  async execute(orderPayload: OrderPayload) {
    await this.cartValidatorService.execute(orderPayload.cart);
  }
}

export default CreateOrderService;
