import { DefaultState } from ".";

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
  postalCode?: string;
  services: ApiPostalCodeServiceResponse[];
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
      };
    }
  | {
      type: "POSTALCODE_SERVICE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "POSTALCODE_SERVICE_RESET" };
