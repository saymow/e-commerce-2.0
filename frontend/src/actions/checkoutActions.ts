import {
  CheckoutCreationAction,
  FilledCartState,
} from "../@types/redux/checkout";
import api from "../services/api";

export const createCheckout = (data: FilledCartState) => async (
  dispatch: (arg0: CheckoutCreationAction) => void
) => {
  try {
    dispatch({
      type: "CHECKOUT_CREATE_REQUEST",
    });

    const {
      data: { id },
    } = await api.post("/checkout", data);

    dispatch({ type: "CHECKOUT_CREATE_SUCCESS", payload: { id } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "CHECKOUT_CREATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const continueAddressCheckout = (
  data: FilledCartState,
  checkoutId: string
) => async (dispatch: (arg0: CheckoutCreationAction) => void) => {
  try {
    dispatch({
      type: "CHECKOUT_CREATE_REQUEST",
    });

    await api.post(`/checkout/${checkoutId}`, data);

    dispatch({ type: "CHECKOUT_CREATE_SUCCESS", payload: { id: checkoutId } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "CHECKOUT_CREATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
