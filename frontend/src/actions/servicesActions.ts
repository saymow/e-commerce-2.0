import { ShipmentCalculatorAction } from "../@types/redux/services";
import localApi from "../services/localApi";
import { shippingServicePriceFormmater } from "../utils";

export const getShipmentMethods = (postalCode: string) => async (
  dispatch: (arg: ShipmentCalculatorAction) => void
) => {
  try {
    dispatch({ type: "POSTALCODE_SERVICE_REQUEST" });

    const { data } = await localApi.get(`/price/${postalCode}`);

    const serializedServices = data.map((service: any) => ({
      ...service,
      value: shippingServicePriceFormmater(service.value),
    }));

    dispatch({
      type: "POSTALCODE_SERVICE_SUCCESS",
      payload: {
        postalCode,
        services: serializedServices,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "POSTALCODE_SERVICE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
