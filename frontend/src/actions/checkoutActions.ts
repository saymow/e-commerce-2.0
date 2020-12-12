import { ShipmentCreationAction, ShipmentData } from "../@types/redux/checkout";
import api from "../services/api";

export const createShipmentData = (data: ShipmentData) => async (
  dispatch: (arg0: ShipmentCreationAction) => void
) => {
  try {
    dispatch({
      type: "SHIPMENT_CREATE_REQUEST",
    });

    const {
      data: { service },
    } = await api.post(`/checkout/shipment/`, data);

    dispatch({ type: "SHIPMENT_CREATE_SUCCESS", payload: { id: service } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SHIPMENT_CREATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
