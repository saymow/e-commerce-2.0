import {
  ShipmentCreateState,
  ShipmentCreationAction,
} from "../@types/redux/checkout";

export default {
  shipmentCreateReducer: (
    state: ShipmentCreateState = {},
    action: ShipmentCreationAction
  ): ShipmentCreateState => {
    switch (action.type) {
      case "SHIPMENT_CREATE_REQUEST": {
        return {
          ...state,
          loading: true,
          reset: () => ({ type: "SHIPMENT_CREATE_RESET" }),
        };
      }
      case "SHIPMENT_CREATE_SUCCESS": {
        const { id } = action.payload;

        return { ...state, id, loading: false, success: true };
      }
      case "SHIPMENT_CREATE_FAIL": {
        return { ...state, loading: false, error: action.payload };
      }
      case "SHIPMENT_CREATE_RESET":
        return {};
      default:
        return state;
    }
  },
};
