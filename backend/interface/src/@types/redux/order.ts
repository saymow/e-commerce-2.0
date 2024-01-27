import { DefaultState } from '.';
import { Product } from './product';
import { User } from './user';

export interface OrderProduct {
  order_id: string;
  product_id: string;
  product: Product;
  qty: number;
  unit_price: number;
}

interface OrderAddress {
  order_id: string;
  state: string;
  city: string;
  neighborhood: string;
  postal_code: string;
  street: string;
  number: number;
}

export enum OrderState {
  IN_PROGRESS = 'IN-PROGRESS',
  IN_TRANSIT = 'IN-TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface Order {
  id: string;
  subtotal: number;
  shipment_cost: number;
  total: number;
  user: User;
  products: OrderProduct[];
  address: OrderAddress;
  shipment_code: string;
  shipment_deadline: string;
  payment_id: string;
  payment_source: string;
  created_at: string;
  updated_at: string;
  state: OrderState;
}

export type ListOrdersState = DefaultState<{
  orders: Order[];
}>;

export type ListOrdersAction =
  | {
      type: 'LIST_ORDERS_REQUEST';
    }
  | {
      type: 'LIST_ORDERS_SUCCESS';
      payload: {
        orders: Order[];
      };
    }
  | {
      type: 'LIST_ORDERS_FAIL';
      payload: {
        message: string;
      };
    }
  | { type: 'LIST_ORDERS_RESET' };
