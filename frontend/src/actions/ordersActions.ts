import { ListOrdersAction } from "../@types/redux/orders";
import api from "../services/api";

export const listOrders = async (
  dispatch: (arg0: ListOrdersAction) => void
) => {
  try {
    dispatch({ type: "LIST_ORDERS_REQUEST" });

    const response = await api.get("/checkout/list");

    dispatch({
      type: "LIST_ORDERS_SUCCESS",
      payload: { orders: response.data },
    });
  } catch (err: any) {
    dispatch({
      type: "LIST_ORDERS_FAIL",
      payload: { message: err.message || "Unexpected error!" },
    });
  }
};
