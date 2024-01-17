import { v4 } from 'uuid';
import redis from '../../config/redis';
import { CHECKOUT_SERVICE_PREFIX } from '../../constants';

import AppError from '../../errors/AppError';

export interface IncompleteAddress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
}

export interface Address extends IncompleteAddress {
  number: string;
}

export interface UserAddress extends Address {
  id: number;
}

export interface CartProduct {
  id: string;
  qty: number;
}

export interface ShipmentMethod {
  postalCode: string;
  name: string;
  code: string;
  value: number;
  deadline: string;
}

export interface InitialCart {
  products: CartProduct[];
  total: number;
  subtotal: number;
  shippingCost: number;
  shipmentMethod: ShipmentMethod;
  shipmentAddress: IncompleteAddress;
}

export type Cart = {
  products: CartProduct[];
  total: number;
  subtotal: number;
  shippingCost: number;
  shipmentMethod: ShipmentMethod;
  shipmentAddress: Address | UserAddress;
};

class CheckoutService {
  private readonly redisExTime = 60 * 15 * 100; // in seconds

  private id: string; // = prefix+userId+serviceId;
  private serviceId: string;

  cart: InitialCart | Cart;

  private buildGlobalId(userId: string, checkoutId: string) {
    return `${CHECKOUT_SERVICE_PREFIX}:${userId}:${checkoutId}`;
  }

  constructor(cart: InitialCart, userId: string, serviceId?: string) {
    this.serviceId = serviceId ?? v4();
    this.id = this.buildGlobalId(userId, this.serviceId);
    this.cart = cart;
  }

  static async connect(userId: string, serviceId: string) {
    const instance = new CheckoutService(
      (null as unknown) as InitialCart,
      userId,
      serviceId
    );

    await instance.populate();

    return instance;
  }

  async populate() {
    let stringifyedData = await redis.get(this.id);

    if (!stringifyedData)
      throw new AppError('Checkout operation data not found.');

    this.cart = JSON.parse(stringifyedData) as Cart;
  }

  async save() {
    await redis.set(this.id, JSON.stringify(this.cart), 'ex', this.redisExTime);
  }

  get serviceIdetenfier() {
    return this.serviceId;
  }
}

export default CheckoutService;
