import {
  CHECKOUT_SERVICE_PREFIX,
  CHECKOUT_SERVICE_SIGNATURE_PREFIX,
} from '../constants';
import argon2 from 'argon2';
import { v4 } from 'uuid';
import redis from '../config/redis';

import AppError from '../errors/AppError';
import Product from '../models/Product';
import InitialCartManager, {
  FilledAddress,
  ToFillAdress,
} from './CheckoutInitialCartManager';

export interface CartProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  count_in_stock: number;
  rating: string;
  num_reviews: number;
  created_at: string;
  updated_at: string;
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
  shipmentAddress: ToFillAdress | FilledAddress;
}

export type FilledCart = InitialCart;

class CheckoutManager {
  private serviceId: string;
  private userId: string;
  private id: string; // = prefix+userId+serviceId;

  private redisExTime = 60 * 15; // in seconds
  private cart: FilledCart;

  constructor() {}

  static async connect(userId: string, key?: string) {
    const instance = new CheckoutManager();

    if (!key) await instance.generateService(userId);
    else {
      await instance.validifyService(userId, key);
      await instance.populate();
    }

    return instance;
  }

  private generateGlobalId(userId: string, serviceId: string) {
    return `${CHECKOUT_SERVICE_PREFIX}:${userId}:${serviceId}`;
  }

  private generateSignatureId(userId: string, serviceId: string) {
    return `${CHECKOUT_SERVICE_SIGNATURE_PREFIX}:${userId}:${serviceId}`;
  }

  private async generateService(userId: string) {
    const serviceId = v4();
    const globalId = this.generateGlobalId(userId, serviceId);

    await redis.set(globalId, '{}', 'ex', this.redisExTime);

    this.id = globalId;
    this.userId = userId;
    this.serviceId = serviceId;
  }

  private async validifyService(userId: string, serviceId: string) {
    const globalId = this.generateGlobalId(userId, serviceId);

    if (!(await redis.get(globalId)))
      throw new AppError('Checkout operation identifier not found.');
    else {
      this.id = globalId;
      this.userId = userId;
      this.serviceId = serviceId;
    }
  }

  private async generateSignature(cart: any) {
    const stringifyedCart = JSON.stringify(cart);
    const signatureId = this.generateSignatureId(this.userId, this.serviceId);

    try {
      const hash = await argon2.hash(stringifyedCart);

      await redis.set(signatureId, hash, 'ex', this.redisExTime);
    } catch (err) {
      console.error(err);
      throw new Error('Error on checkout');
    }
  }

  private async validifySignature(cart: any) {
    const stringifyedCart = JSON.stringify(cart);
    const signatureId = this.generateSignatureId(this.userId, this.serviceId);

    try {
      const hash = await argon2.hash(stringifyedCart);

      await redis.set(signatureId, hash, 'ex', this.redisExTime);
    } catch (err) {
      console.error(err);
      throw new Error('Error on checkout');
    }
  }

  private async populate() {
    let stringifyedData = await redis.get(this.id);

    if (!stringifyedData)
      throw new AppError('Checkout operation data not found.');

    let data = JSON.parse(stringifyedData) as FilledCart;

    const {
      total,
      subtotal,
      shippingCost,
      shipmentMethod,
      products,
      shipmentAddress,
    } = data;

    this.cart = {
      total,
      subtotal,
      shippingCost,
      shipmentMethod,
      products,
      shipmentAddress,
    };
  }

  async subscribeInitialCheckoutData(cart: FilledCart) {
    const initialCart = await InitialCartManager.create(cart);

    const stringifyedData = JSON.stringify(initialCart);

    await redis.set(this.id, stringifyedData, 'ex', this.redisExTime);
    await this.generateSignature(initialCart.products);

    this.cart = cart;
  }

  get serviceIdetenfier() {
    return this.serviceId;
  }

  get cartData() {
    return this.cart;
  }
}

export default CheckoutManager;
