import { SuccessPostalCodeServiceResponse } from "./services";
import { CartProduct, DefaultState } from ".";

export type ShipmentData = SuccessPostalCodeServiceResponse;

export interface FilledCartState {
  total: number;
  subtotal: number;
  shippingCost: number;
  products: CartProduct[];
  shipmentMethod: ShipmentData;
}

export interface CheckoutCreateState extends DefaultState {
  id?: string;
}

export type CheckoutCreationAction =
  | {
      type: "CHECKOUT_CREATE_REQUEST";
    }
  | {
      type: "CHECKOUT_CREATE_SUCCESS";
      payload: {
        id: string;
      };
    }
  | {
      type: "CHECKOUT_CREATE_FAIL";
      payload: {
        message: string;
      };
    }
  | { type: "CHECKOUT_CREATE_RESET" };
