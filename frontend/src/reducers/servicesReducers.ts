import {
  ShipmentCalculatorState,
  ShipmentCalculatorAction,
} from "../@types/redux/services";

export const shipmentCalculatorReducer = (
  state: ShipmentCalculatorState = { services: [] },
  action: ShipmentCalculatorAction
): ShipmentCalculatorState => {
  switch (action.type) {
    case "POSTALCODE_SERVICE_REQUEST": {
      return {
        services: [],
        loading: true,
        reset: () => ({ type: "POSTALCODE_SERVICE_RESET" }),
      };
    }
    case "POSTALCODE_SERVICE_SUCCESS": {
      const { services, postalCode, address } = action.payload;

      return {
        ...state,
        services,
        postalCode,
        address,
        success: true,
        loading: false,
      };
    }
    case "POSTALCODE_SERVICE_FAIL": {
      const error = action.payload;

      return { ...state, error, success: false, loading: false };
    }

    case "POSTALCODE_SERVICE_RESET": {
      return { services: [] };
    }

    default:
      return state;
  }
};
