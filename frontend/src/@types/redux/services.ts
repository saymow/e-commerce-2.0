import { DefaultState } from ".";
import { FetchedAddress, GivenAddress } from "./address";

export interface SuccessPostalCodeServiceResponse {
  name: string;
  code: string;
  value: number;
  deadline: string;
}

export interface FailPostalCodeServiceResponse {
  name: string;
  code: string;
  error: {
    code: string;
    message: string;
  };
}

type ApiPostalCodeServiceResponse = SuccessPostalCodeServiceResponse &
  FailPostalCodeServiceResponse;

export interface ShipmentCalculatorState extends DefaultState {
  services: ApiPostalCodeServiceResponse[];
  postalCode?: string;
  address?: FetchedAddress;
}

export type ShipmentCalculatorAction =
  | {
      type: "POSTALCODE_SERVICE_REQUEST";
    }
  | {
      type: "POSTALCODE_SERVICE_SUCCESS";
      payload: {
        services: ApiPostalCodeServiceResponse[];
        postalCode: string;
        address: FetchedAddress;
      };
    }
  | {
      type: "POSTALCODE_SERVICE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "POSTALCODE_SERVICE_RESET" };
