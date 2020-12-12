import { SuccessPostalCodeServiceResponse } from "./services";
import { DefaultState } from ".";

export type ShipmentData = SuccessPostalCodeServiceResponse;

export interface ShipmentCreateState extends DefaultState {
  id?: string;
}

export type ShipmentCreationAction =
  | {
      type: "SHIPMENT_CREATE_REQUEST";
    }
  | {
      type: "SHIPMENT_CREATE_SUCCESS";
      payload: { id: string };
    }
  | {
      type: "SHIPMENT_CREATE_FAIL";
      payload: {
        message: string;
      };
    }
  | { type: "SHIPMENT_CREATE_RESET" };
