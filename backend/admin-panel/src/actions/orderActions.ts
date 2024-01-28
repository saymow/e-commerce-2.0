import Axios from 'axios';
import { ListOrdersAction, ShowOrderAction } from '../@types/redux/order';

export const listOrders = async (
  dispatch: (arg0: ListOrdersAction) => void
) => {
  try {
    dispatch({ type: 'LIST_ORDERS_REQUEST' });

    const response = await Axios.get('/api/admin/checkout/list');

    dispatch({
      type: 'LIST_ORDERS_SUCCESS',
      payload: { orders: response.data },
    });
  } catch (err: any) {
    dispatch({
      type: 'LIST_ORDERS_FAIL',
      payload: { message: err.message || 'Unexpected error!' },
    });
  }
};

export const showOrder = (orderId: string) => async (
  dispatch: (arg0: ShowOrderAction) => void
) => {
  try {
    dispatch({ type: 'SHOW_ORDER_REQUEST' });

    const response = await Axios.get(`/api/admin/checkout/${orderId}`);

    dispatch({
      type: 'SHOW_ORDER_SUCCESS',
      payload: { order: response.data },
    });
  } catch (err: any) {
    dispatch({
      type: 'SHOW_ORDER_FAIL',
      payload: { message: err.message || 'Unexpected error!' },
    });
  }
};
