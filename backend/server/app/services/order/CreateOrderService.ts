import { Cart } from "@services/checkout/CheckoutService";


class CreateOrderService {
  async execute(
    cart: Cart,
    userId: string,
    checkoutId: string,
    paymentId: string,
    paymentSource: string
  ) {}
}
