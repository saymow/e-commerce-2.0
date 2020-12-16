import {
  CheckoutCreateState,
  CheckoutCreationAction,
} from "../@types/redux/checkout";

export const checkoutCreateReducer = (
  state: CheckoutCreateState = {},
  action: CheckoutCreationAction
): CheckoutCreateState => {
  switch (action.type) {
    case "CHECKOUT_CREATE_REQUEST": {
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "CHECKOUT_CREATE_RESET" }),
      };
    }
    case "CHECKOUT_CREATE_SUCCESS": {
      const { id } = action.payload;

      return { ...state, id, loading: false, success: true };
    }
    case "CHECKOUT_CREATE_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "CHECKOUT_CREATE_RESET":
      return {};
    default:
      return state;
  }
};
